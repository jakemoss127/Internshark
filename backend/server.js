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

const options = {
    method: 'GET',
    url: 'https://jsearch.p.rapidapi.com/search',
    params: {
        query: 'Marketing',
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


const fetchData = async () => {
    try {
        const response = await axios.request(options);
        const dataToSave = JSON.stringify(response.data, null, 2);
        fs.writeFileSync('fetchedData.json', dataToSave, 'utf-8');
        console.log('Data saved to fetchedData.json');

    } catch (error) {
        console.error(error);
    }
    return;
}

app.post('/add-jobs-software-engineering', async (req, res) => {
    try {
        // Read the dummy data JSON file
        const data = JSON.parse(fs.readFileSync('fetchedData.json', 'utf8'));

        for (const job of data.data) {
            const { employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state, job_posted_at_datetime_utc } = job;

            const existingJob = await pool.query('SELECT * FROM "Software Engineering" WHERE employer_name = $1',
                [employer_name]);

            // If the job doesn't exist, insert it into the database
            if (existingJob.rows.length === 0) {
                await pool.query('INSERT INTO "Software Engineering" (employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state, job_posted_at_datetime_utc) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                    [employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state, job_posted_at_datetime_utc]);
            }
        }
        res.status(200).send('Jobs saved successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/add-jobs-business', async (req, res) => {
    try {
        // Read the dummy data JSON file
        const data = JSON.parse(fs.readFileSync('fetchedData.json', 'utf8'));

        for (const job of data.data) {
            const { employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state, job_posted_at_datetime_utc } = job;

            const existingJob = await pool.query('SELECT * FROM "Business" WHERE employer_name = $1',
                [employer_name]);

            // If the job doesn't exist, insert it into the database
            if (existingJob.rows.length === 0) {
                await pool.query('INSERT INTO "Business" (employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state, job_posted_at_datetime_utc) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                    [employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state, job_posted_at_datetime_utc]);
            }
        }
        res.status(200).send('Jobs saved successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/add-jobs-econ', async (req, res) => {
    try {
        // Read the dummy data JSON file
        const data = JSON.parse(fs.readFileSync('fetchedData.json', 'utf8'));

        for (const job of data.data) {
            const { employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state, job_posted_at_datetime_utc } = job;

            const existingJob = await pool.query('SELECT * FROM "Econ" WHERE employer_name = $1',
                [employer_name]);

            // If the job doesn't exist, insert it into the database
            if (existingJob.rows.length === 0) {
                await pool.query('INSERT INTO "Econ" (employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state, job_posted_at_datetime_utc) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                    [employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state, job_posted_at_datetime_utc]);
            }
        }
        res.status(200).send('Jobs saved successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/add-jobs-marketing', async (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync('fetchedData.json', 'utf8'));

        for (const job of data.data) {
            const { employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state, job_posted_at_datetime_utc } = job;

            const existingJob = await pool.query('SELECT * FROM "Marketing" WHERE employer_name = $1',
                [employer_name]);

            if (existingJob.rows.length === 0) {
                await pool.query('INSERT INTO "Marketing" (employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state, job_posted_at_datetime_utc) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                    [employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state, job_posted_at_datetime_utc]);
            }
        }
        res.status(200).send('Jobs saved successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/add-jobs-finance', async (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync('fetchedData.json', 'utf8'));

        for (const job of data.data) {
            const { employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state, job_posted_at_datetime_utc } = job;

            const existingJob = await pool.query('SELECT * FROM "Finance" WHERE employer_name = $1',
                [employer_name]);

            if (existingJob.rows.length === 0) {
                await pool.query('INSERT INTO "Finance" (employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state, job_posted_at_datetime_utc) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                    [employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state, job_posted_at_datetime_utc]);
            }
        }
        res.status(200).send('Jobs saved successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
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


    //              DO NOT UNCOMMENT THIS !!!!!!!!!!!!!!
    //fetchData();
});