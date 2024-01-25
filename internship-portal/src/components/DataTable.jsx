import React, { useEffect, useState } from 'react';
import './DataTable.css';

const DataTable = () => {
    const [data, setData] = useState([]);
    const [jobs, setJobs] = useState([]);

    // Fetch data from backend
    const fetchSoftwareInternships = async() => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/software-engineering-jobs`);
            const json = await response.json();
            setData(json); // Set the fetched data to the state
            setJobs(json.map(job => ({
                employer_name: job.employer_name,
                employer_website: job.employer_website || 'N/A', // Default to 'N/A' if not available
                job_title: job.job_title,
                job_apply_link: job.job_apply_link,
                employer_logo: job.employer_logo || 'N/A', // Default to 'N/A' if not available
                job_is_remote: job.job_is_remote || false, // Default to false if not specified
                job_city: job.job_city || 'N/A', 
                job_state: job.job_state || 'N/A'
            })));
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    }

    useEffect(() => {
        fetchSoftwareInternships();
    }, []);

    return (
        <div className='table-container'>
            <h1>Job Listings</h1>
            <div style={{ color: 'white' }}>
                {jobs.map((job, index) => (
                    <div key={index}>
                        <h3>{job.job_title}</h3>
                        <p>{job.employer_name}</p>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataTable;
