import React from 'react'
import Nav from '../components/Nav.jsx';
import './Chart.css';
import DataTable from '../components/DataTable.jsx';
import { motion } from 'framer-motion';

const Chart = () => {
  return (
    <div className='chart-container'>
        <Nav />
        <h1 className='chart-title'>Internshark's Job Chart</h1>
        <h2 className='subtitle'>Below is the list of internship listings to apply to</h2>
        <motion.div className="data-container"
          initial={{y: 800, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{duration: 1.3, ease: 'easeInOut'}} 
        >
          <DataTable />
        </motion.div>
    </div>
  )
}

export default Chart