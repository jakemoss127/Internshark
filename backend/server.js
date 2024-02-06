const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const fs = require('fs');
const app = express();
const axios = require('axios');
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_API_SECRET_KEY);

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
    // connectionString: process.env.DB_CONNECTION_STRING // For when we integrate online backend
});

app.use(cors());
app.use(express.json());

const generateOptionsForSector = (sector) => {
    return {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
            query: sector,
            page: '1',
            num_pages: '20',
            date_posted: 'all',
            employment_types: 'INTERN',
        },
        headers: {
            'X-RapidAPI-Key': process.env.X_RAPID_KEY,
            'X-RapidAPI-Host': process.env.X_RAPID_HOST,
        }
    };
}

const saveDataToDatabase = async (sector, data) => {
    for (const job of data.data) {
        const { employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state, job_posted_at_datetime_utc } = job;

        const existingJob = await pool.query(`SELECT * FROM "${sector}" WHERE employer_name = $1`, [employer_name]);

        if (existingJob.rows.length === 0) {
            await pool.query(`INSERT INTO "${sector}" (employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state, job_posted_at_datetime_utc) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state, job_posted_at_datetime_utc]);
        }
    }
};

const fetchDataAndSave = async (sector) => {
    const options = generateOptionsForSector(sector);

    try {
        const response = await axios.request(options);
        await saveDataToDatabase(sector, response.data);
        console.log(`${sector} data fetched and saved to database.`)
    } catch (error) {
        console.error(`Error fetching or saving ${sector} data:`, error);
    }
}

// Endpoint to retrieve user status
app.get('/get-user-status/:userEmail', async (req, res) => {
    const userEmail = req.params.userEmail;

    try {
        const result = await pool.query(
            `SELECT status FROM "Users" WHERE email = $1;`,
            [userEmail]
        );

        if (result.rows.length === 1) {
            const userStatus = result.rows[0].status;

            if (userStatus === 'Gold') {
                res.json({ status: 'Gold' });
            } else if (userStatus === 'Pro') {
                res.json({ status: 'Pro' });
            } else {
                res.json({ status: 'Basic' });
            }
        } else {
            res.json({ status: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Endpoint for creating a Pro subscription checkout session
app.post('/create-checkout-session-pro/:userEmail', async (req, res) => {
    try {
        const userEmail = req.params.userEmail;
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{
                price: process.env.STRIPE_PRO_API_ID,
                quantity: 1,
            }],
            success_url: `${req.headers.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/payment-cancelled`,
            metadata: { userEmail: userEmail, subscription_type: 'Pro' },
        });

        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint for creating a Gold subscription checkout session
app.post('/create-checkout-session-gold/:userEmail', async (req, res) => {
    try {
        const userEmail = req.params.userEmail;
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{
                price: process.env.STRIPE_GOLD_API_ID,
                quantity: 1,
            }],
            success_url: `${req.headers.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/payment-cancelled`,
            metadata: { userEmail: userEmail, subscription_type: 'Gold' },
        });

        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Webhook endpoint for Stripe events
app.post('/stripe-webhook', express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userEmail = session.metadata.userEmail; // Retrieve the userEmail from metadata
        const subscriptionType = session.metadata.subscription_type; // Retrieve subscription type from metadata

        // Determine status based on subscription type
        const userStatus = subscriptionType === 'Pro' ? 'Pro' : 'Gold';

        // Update the user's status in the database
        await pool.query(`
            UPDATE "Users" SET status = $1 WHERE email = $2;
        `, [userStatus, userEmail]);
    }

    // Return a response to acknowledge receipt of the event
    res.json({received: true});
});

// Endpoint to save user data
app.post('/save-user', async (req, res) => {
    const { name, email } = req.body;
    try {
      await pool.query(`
        INSERT INTO "Users" (name, email) 
        VALUES ($1, $2) 
        ON CONFLICT (email) DO NOTHING`, 
        [name, email]
      );
      res.status(201).json({ message: 'User data saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
// Endpoint to retrieve SOFTWARE internships
app.get('/software-engineering-jobs', async (req, res) => {
    try {
        const softwareJobs = await pool.query(
            `SELECT * FROM "Software" WHERE job_posted_at_datetime_utc IS NOT NULL ORDER BY job_posted_at_datetime_utc DESC`,
        )
        res.json(softwareJobs.rows)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})

// Endpoint to retrieve BUSINESS internships
app.get('/business-jobs', async (req, res) => {
    try {
        const businessJobs = await pool.query(
            `SELECT * FROM "Business" ORDER BY job_posted_at_datetime_utc DESC`,
        )
        res.json(businessJobs.rows)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})

// Endpoint to retrieve ECONOMICS internships
app.get('/econ-jobs', async (req, res) => {
    try {
        const econJobs = await pool.query(
            `SELECT * FROM "Economics" ORDER BY job_posted_at_datetime_utc DESC`,
        )
        res.json(econJobs.rows)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})

// Endpoint to retrieve FINANCE internships
app.get('/finance-jobs', async (req, res) => {
    try {
        const financeJobs = await pool.query(
            `SELECT * FROM "Finance" ORDER BY job_posted_at_datetime_utc DESC`,
        )
        res.json(financeJobs.rows)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})

// Endpoint to retrieve MARKETING internships
app.get('/marketing-jobs', async (req, res) => {
    try {
        const marketingJobs = await pool.query(
            `SELECT * FROM "Marketing" ORDER BY job_posted_at_datetime_utc DESC`,
        )
        res.json(marketingJobs.rows)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})

// Endpoint to retrieve TOTAL internships
app.get('/total-jobs', async (req, res) => {
    try {
        const total = await pool.query(
            `SELECT 
                (SELECT COUNT(*) FROM "Software") +
                (SELECT COUNT(*) FROM "Business") +
                (SELECT COUNT(*) FROM "Economics") +
                (SELECT COUNT(*) FROM "Finance") +
                (SELECT COUNT(*) FROM "Marketing") AS TotalJobs`
        );
        res.json(total.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


app.listen(process.env.APP_PORT, () => {
    console.log('Server running on port ,', process.env.APP_PORT);

    // Schedule tasks to run every day at midnight (00:00)
    // cron.schedule('0 0 * * *', () => {
    //     console.log('Scheduled data fetching started.');
    //     const sectors = ['Software Engineering', 'Business', 'Econ', 'Finance', 'Marketing'];
    //     sectors.forEach(sector => {
    //         fetchDataAndSave(sector);
    //     });
    // });

    // console.log('Scheduled data fetching started.');
    // const sectors = ['Software', 'Business', 'Economics', 'Finance', 'Marketing'];
    // sectors.forEach(sector => {
    //     fetchDataAndSave(sector);
    // });

});