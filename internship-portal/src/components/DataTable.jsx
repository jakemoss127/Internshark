import React, { useEffect, useState, useMemo } from 'react';
import { UserAuth } from '../context/AuthContext';
import './DataTable.css';
import { useTable, usePagination } from 'react-table';
import COLUMNS from './Columns.jsx';
import axios from 'axios'

const DataTable = () => {

  const { user } = UserAuth();

  const [softwareJobs, setSoftwareJobs] = useState([]);
  const [businessData, setBusinessData] = useState([]);
  const [econData, setEconData] = useState([]);
  const [financeData, setFinanceData] = useState([]);
  const [marketingData, setMarketingData] = useState([]);
  const [status, setStatus] = useState([])


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

  const getUserStatus = async () => {
    if (user) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}get-user-status/${user.email}`)
        const json = await response.json()
        setStatus(json.status)
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    getUserStatus();
  }, [user])

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_BACKEND_URL}software-engineering-jobs`, setSoftwareJobs);
    fetchData(`${import.meta.env.VITE_BACKEND_URL}business-jobs`, setBusinessData);
    fetchData(`${import.meta.env.VITE_BACKEND_URL}econ-jobs`, setEconData);
    fetchData(`${import.meta.env.VITE_BACKEND_URL}finance-jobs`, setFinanceData);
    fetchData(`${import.meta.env.VITE_BACKEND_URL}marketing-jobs`, setMarketingData);

  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const softwareTableInstance = useTable({ columns, data: softwareJobs }, usePagination);
  const businessTableInstance = useTable({ columns, data: businessData }, usePagination);
  const econTableInstance = useTable({ columns, data: econData }, usePagination);
  const financeTableInstance = useTable({ columns, data: financeData }, usePagination);
  const marketingTableInstance = useTable({ columns, data: marketingData }, usePagination);



  const renderTable = (tableInstance) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      state: { pageIndex },
    } = tableInstance;

    const handleSelection = (event) => { 
      const selectedValue = event.target.value;
      setActiveChart(selectedValue);
    };

    const titledChart = activeChart.charAt(0).toUpperCase() + activeChart.slice(1);
    return (
      <>
        <div className="filter-bar">
          <h1>Current Table: <span style={{color: '#4c8fe6', fontWeight: '300'}}>{titledChart}</span></h1>
          <div className="searchbar">
            <input type="text" placeholder="Search..." />
            <button>Search</button>
          </div>
              <select id='majorDropdown' className='button-dropdown' onChange={handleSelection}>
              <option value='software'>Default</option>
                <option value='software'>Software Engineering</option>
                <option value='business'>Business Admin</option>
                <option value='econ'>Economics</option>
                <option value='finance'>Finance</option>
                <option value='marketing'>Marketing</option>
              </select>
        </div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (headerGroup.headers.map(column => ( <th {...column.getHeaderProps()}>{column.render('Header')}</th>))))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
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
        <div className="pagination">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>
          <span>
            Page&nbsp;{' '}
            <p>
              {pageIndex + 1} of {pageOptions.length}
            </p>
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
        </div>
      </>
    );
  };
  
  return (
    <div className="all-content">
      {!user ? (
        <div className='sign-in-popup'>Please sign in to view our charts...</div>
      ) : status === 'Gold' ? ( // Check if the user has "Gold" status
        <>
          <div className="table-container">
            {activeChart === 'software' && renderTable(softwareTableInstance)}
            {activeChart === 'business' && renderTable(businessTableInstance)}
            {activeChart === 'econ' && renderTable(econTableInstance)}
            {activeChart === 'finance' && renderTable(financeTableInstance)}
            {activeChart === 'marketing' && renderTable(marketingTableInstance)}
          </div>
        </>
      ) : (
        <div className='gold-status-required'>You need a Gold status to view the charts.</div>
      )}
    </div>
  );
  
};

export default DataTable;
