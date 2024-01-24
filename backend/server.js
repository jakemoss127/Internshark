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

// const options = {
//   method: 'GET',
//   url: '',
//   params: {
//     query: 'Software Intern',
//     page: '1',
//     num_pages: '1',
//     date_posted: 'all',
//     employment_types: 'INTERN',
//   },
//   headers: {
//     'X-RapidAPI-Key': '',
//     'X-RapidAPI-Host': ''
//   }
// };

// const fetchData = async () => {
//     // try {
//     //     const response = await axios.request(options);
//     //     console.log(response.data);
//     // } catch (error) {
//     //     console.error(error);
//     // }
//     return;
// }

app.post('/add-jobs', async (req, res) => {
    try {
        // Read the dummy data JSON file
        const data = JSON.parse(fs.readFileSync('dummyData.json', 'utf8'));

        for (const job of data.data) {
            const { employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state } = job;
            await pool.query('INSERT INTO "Software Engineering" (employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                [employer_name, employer_website, job_title, job_apply_link, employer_logo, job_is_remote, job_city, job_state]);
        }
        res.status(200).send('Jobs saved successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(process.env.APP_PORT, () => {
    console.log('Server running on port ,', process.env.APP_PORT);
});