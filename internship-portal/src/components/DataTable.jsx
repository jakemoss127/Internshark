import React, { useEffect, useState, useMemo } from 'react';
import './DataTable.css';
import { useTable } from 'react-table';
import COLUMNS from './Columns.jsx';


const DataTable = () => {
  const [jobs, setJobs] = useState([]);

  const fetchSoftwareInternships = async () => {
    try {
      // FECTHING FROM THE BACKEND...
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}software-engineering-jobs`);
      const json = await response.json();

      setJobs(
        json.map((job) => ({
          employer_name: job.employer_name,
          employer_website: job.employer_website || 'N/A',
          job_title: job.job_title,
          job_apply_link: job.job_apply_link,
          employer_logo: job.employer_logo || 'N/A',
          job_is_remote: job.job_is_remote || false,
          job_city: job.job_city || '',
          job_state: job.job_state || 'USA',
          job_posted_at_datetime_utc: job.job_posted_at_datetime_utc || '1/1/2000',
        }))
      );
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchSoftwareInternships();
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const tableInstance = useTable({ columns, data: jobs });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <div className="table-container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
