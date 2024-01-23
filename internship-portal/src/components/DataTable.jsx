import React, { useEffect, useState } from 'react';
import './DataTable.css';
import { obj } from './FetchData';

const DataTable = () => {
    const [data, setData] = useState([]);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await obj; 
                setData(result.data);
                setJobs(result.data.map(job => ({
                    employer_name: job.employer_name,
                    employer_website: job.employer_website,
                    job_title: job.job_title,
                    job_apply_link: job.job_apply_link,
                    employer_logo: job.employer_logo,
                    job_is_remote: job.job_is_remote,
                    job_city: job.job_city || 'N/A', 
                    job_state: job.job_state || 'N/A'
                })));
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
        console.log('first');
        }, []);
    return (
        <div className='table-container'>
            <h1>Job Listings</h1>
            {/* Render your data here */}
            <div style={{ color: 'white' }}>
                {jobs.map((job, index) => (
                    <div key={index}>
                        <h3>{job.job_title}</h3>
                        <p>{job.employer_name}</p>
                        {/* Other job details */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataTable;
