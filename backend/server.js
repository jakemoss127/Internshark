const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const fs = require('fs');
const app = express();
const axios = require('axios');
require('dotenv').config();

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
        query: 'Software Intern',
        page: '1',
        num_pages: '10',
        date_posted: 'all',
        employment_types: 'INTERN',
    },
    headers: {
        'X-RapidAPI-Key': process.env.X_RAPID_KEY,
        'X-RapidAPI-Host': process.env.X_RAPID_HOST,
    }
};

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

app.post('/add-jobs', async (req, res) => {
    try {
        // Read the dummy data JSON file
        const data = JSON.parse(fs.readFileSync('fetchedData.json', 'utf8'));

        for (const job of data.data) {
            const { employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state, job_posted_at_datetime_utc } = job;

            const existingJob = await pool.query('SELECT * FROM "Software Engineering" WHERE employer_name = $1 AND job_title = $2',
                [employer_name, job_title]);

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

app.listen(process.env.APP_PORT, () => {
    console.log('Server running on port ,', process.env.APP_PORT);


    //              DO NOT UNCOMMENT THIS !!!!!!!!!!!!!!
    // fetchData();
});