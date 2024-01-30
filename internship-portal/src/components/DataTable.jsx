import React, { useEffect, useState, useMemo } from 'react';
import './DataTable.css';
import { useTable } from 'react-table';
import COLUMNS from './Columns.jsx';

const DataTable = () => {
  const [softwareJobs, setSoftwareJobs] = useState([]);
  const [businessData, setBusinessData] = useState([]);
  const [econData, setEconData] = useState([]);
  const [financeData, setFinanceData] = useState([]);

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
    fetchData(`${import.meta.env.VITE_BACKEND_URL}software-engineering-jobs`, setSoftwareJobs);
    fetchData(`${import.meta.env.VITE_BACKEND_URL}business-jobs`, setBusinessData);
    fetchData(`${import.meta.env.VITE_BACKEND_URL}econ-jobs`, setEconData);
    fetchData(`${import.meta.env.VITE_BACKEND_URL}finance-jobs`, setFinanceData);
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const softwareTableInstance = useTable({ columns, data: softwareJobs });
  const businessTableInstance = useTable({ columns, data: businessData });
  const econTableInstance = useTable({ columns, data: econData });
  const financeTableInstance = useTable({ columns, data: financeData });


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
        <button onClick={() => setActiveChart('finance')}>Finance</button>

      </div>

      {activeChart === 'software' && renderTable(softwareTableInstance)}
      {activeChart === 'business' && renderTable(businessTableInstance)}
      {activeChart === 'econ' && renderTable(econTableInstance)}
      {activeChart === 'finance' && renderTable(financeTableInstance)}

    </div>
  );
};

export default DataTable;
