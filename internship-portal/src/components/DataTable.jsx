import React, { useEffect, useState, useMemo } from 'react';
import './DataTable.css';
import { useTable } from 'react-table';
import COLUMNS from './Columns.jsx';

const DataTable = () => {
  const [jobs, setJobs] = useState([]);
  const [businessData, setBusinessData] = useState([]);
  const [econData, setEconData] = useState([]);
  const [activeChart, setActiveChart] = useState('software');

  const fetchData = async (url, setState) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setState(json);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_BACKEND_URL}software-engineering-jobs`, setJobs);
    fetchData(`${import.meta.env.VITE_BACKEND_URL}business-jobs`, setBusinessData);
    fetchData(`${import.meta.env.VITE_BACKEND_URL}econ-jobs`, setEconData);
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const jobsTableInstance = useTable({ columns, data: jobs });
  const businessTableInstance = useTable({ columns, data: businessData });
  const econTableInstance = useTable({ columns, data: econData });

  const renderTable = (tableInstance) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="table-container">
      <div className='button-container'>
        <button onClick={() => setActiveChart('software')}>Software Engineering Jobs</button>
        <button onClick={() => setActiveChart('business')}>Business Admin</button>
        <button onClick={() => setActiveChart('econ')}>Economics</button>
      </div>

      {activeChart === 'software' && renderTable(jobsTableInstance)}
      {activeChart === 'business' && renderTable(businessTableInstance)}
      {activeChart === 'econ' && renderTable(econTableInstance)}
    </div>
  );
};

export default DataTable;
