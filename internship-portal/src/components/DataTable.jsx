import React, { useEffect, useState } from 'react';
import './DataTable.css';
import { obj } from './FetchData';

const DataTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Assuming 'obj' is a Promise. If it's not, you don't need 'await' here.
                const result = await obj;
                setData(result);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
        console.log('first');
        }, []); // Empty dependency array to run only on component mount

    console.log(data);
    return (
        <div className='table-container'>
            <h1>Here is the table</h1>
            {/* Render your data here */}
        </div>
    );
};

export default DataTable;
