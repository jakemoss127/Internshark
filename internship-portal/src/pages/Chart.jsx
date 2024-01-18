import React from 'react'
import Nav from '../components/Nav.jsx';
import './Chart.css';
import DataTable from '../components/DataTable.jsx';

const Chart = () => {
  return (
    <div className='chart-container'>
        <Nav />
        <h1 className='chart-title'>Internshark's Job Chart</h1>
        <h2 className='subtitle'>Below is the list of internship listings to apply to</h2>
        <div className="data-container">
          <DataTable />
        </div>
    </div>
  )
}

export default Chart