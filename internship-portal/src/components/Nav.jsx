import React, { useEffect } from 'react';
import {useState} from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import './Nav.css';
import internlogo from '../assets/internshark.svg';
import Auth from '../pages/Auth';
import { useUser } from '../context/UserContext';

const Nav = () => {

  const { userName } = useUser();

  return (
    <motion.div className='nav-border'
      initial={{y: -100}}
      animate={{y: 0}}
      transition={{duration: 1, ease: 'easeInOut'}}
      >
        <div className='logo-container'>
          <img src={internlogo} alt="Internshark Logo" className="logo" style={{maxHeight: '25px', maxWidth: '25px'}}/>
          <h1 className="logo-text">Internshark</h1>
        </div>
        <div className="middle-menu">
          <nav className="navbar">
            <a href="/">Home</a>
            <a>Pricing</a>
            <a href="https://github.com/jakemoss127" target='_blank'>GitHub</a>
            <a>News</a>
            <a href="/chart">Chart</a>
          </nav>
        </div>
        <div className="authentication-menu">
          {!userName ? <a>Sign In</a> : <a>Welcome, {userName}</a>}
          {!userName && <Auth />}
          {userName && <button className='sign-up'>Sign out</button>}
        </div>
    </motion.div>
  )
}

export default Nav