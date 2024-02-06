import React, { useEffect } from 'react';
import {useState} from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import './Nav.css';
import internlogo from '../assets/internshark.svg';
import Auth from '../pages/Auth';
import { UserAuth } from '../context/AuthContext';
import { CgProfile } from "react-icons/cg";

const Nav = () => { 

  const {user, logOut} = UserAuth();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className='nav'>
      <motion.div className='nav-border'
      initial={{y: -100}}
      animate={{y: 0}}
      transition={{duration: 1, ease: 'easeInOut'}}
      >
        <div className='logo-container'>
          <img src={internlogo} alt="Internshark Logo" className="logo" style={{maxHeight: '25px', maxWidth: '25px'}}/>
          <h1 className="logo-text">Internshark</h1>
          <div className='pill'>Beta</div>
        </div>
        <div className="middle-menu">
          <nav className="navbar">
            <a href="/">Home</a>
            <a href='/pricing'>Pricing</a>
            <a href="https://github.com/jakemoss127/Internshark" target='_blank'>GitHub</a>
            <a href='/about'>About</a>
            <a href="/chart">Chart</a>
          </nav>
        </div>
        <div className="authentication-menu">
          {!user ? <a></a> : <a href='/settings' style={{
            display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center', cursor: 'pointer'
          }}><CgProfile style={{marginRight: '0.5rem', color: 'white', minHeight: '20px', minWidth: '20px'}}/>{user.displayName}</a>}
          {!user && <Auth />}
          {user && <button className='sign-up' onClick={logOut}>Sign out</button>}
        </div>
      </motion.div>
    </div>
  )
}

export default Nav