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
  

// STRIPE CHECKOUT PRO
app.post('/create-checkout-session-pro', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{
                price: process.env.STRIPE_PRO_API_ID,
                quantity: 1,
            }],
            success_url: `${req.headers.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/payment-cancelled`,
        });

        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// STRIPE CHECKOUT GOLD
app.post('/create-checkout-session-gold', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{
                price: process.env.STRIPE_GOLD_API_ID,
                quantity: 1,
            }],
            success_url: `${req.headers.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/payment-cancelled`,
        });
        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/software-engineering-jobs', async (req, res) => {
    try {
        const softwareJobs = await pool.query(
            `SELECT * FROM "Software Engineering" WHERE job_posted_at_datetime_utc IS NOT NULL ORDER BY job_posted_at_datetime_utc DESC`,
        )
        res.json(softwareJobs.rows)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})

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

app.get('/econ-jobs', async (req, res) => {
    try {
        const econJobs = await pool.query(
            `SELECT * FROM "Econ" ORDER BY job_posted_at_datetime_utc DESC`,
        )
        res.json(econJobs.rows)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})

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

app.get('/total-jobs', async (req, res) => {
    try {
        const total = await pool.query(
            `SELECT 
                (SELECT COUNT(*) FROM "Software Engineering") +
                (SELECT COUNT(*) FROM "Business") +
                (SELECT COUNT(*) FROM "Econ") +
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
    // const sectors = ['Software Engineering', 'Business', 'Econ', 'Finance', 'Marketing'];
    // sectors.forEach(sector => {
    //     fetchDataAndSave(sector);
    // });

});