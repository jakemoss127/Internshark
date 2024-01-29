import React, { useEffect, useState } from 'react';
import './DataTable.css';
import fetchedData from '../assets/fetchedData.json'

const DataTable = () => {
    const [jobs, setJobs] = useState([]);

    const fetchSoftwareInternships = async() => {
        try {

            // FECTHING FROM THE BACKEND...
            // const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/software-engineering-jobs`);
            // const json = await response.json();

            // FETCHING FROM DUMMY DATA...
            const json = fetchedData;

            setJobs(json.data.map(job => ({
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
                        <a href={job.job_apply_link}>LINK TO INTERNSHIP for {job.employer_name}</a>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataTable;
