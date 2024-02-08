import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import './Nav.css';
import internlogo from '../assets/internshark.svg';
import Auth from '../pages/Auth';
import { UserAuth } from '../context/AuthContext';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

const Nav = () => {
  const { user, logOut } = UserAuth();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className='nav'>
      <motion.div className='nav-border'
      initial={{y: -100}}
      animate={{y: 0}}
      transition={{duration: 1, ease: 'easeInOut'}}>
        <Link to='/' style={{textDecoration: 'none'}}>
          <div className='logo-container'>
            <img src={internlogo} alt="Internshark Logo" className="logo" style={{maxHeight: '25px', maxWidth: '25px'}}/>
            <h1 className="logo-text">Internshark</h1>
          </div>
        </Link>
        <div className="middle-menu">
          <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/pricing">Pricing</Link>
            <a href="https://github.com/jakemoss127/Internshark" target='_blank' rel="noopener noreferrer">GitHub</a>
            <Link to="/about">About</Link>
            <Link to="/chart">Chart</Link>
          </nav>
        </div>
        <div className="authentication-menu">
          {user ? (
            <Link to='/settings' style={{
              display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center', cursor: 'pointer'
            }}>
              <CgProfile style={{marginRight: '0.5rem', color: 'white', minHeight: '20px', minWidth: '20px'}}/>
              {user.displayName}
            </Link>
          ) : (
            <Auth />
          )}
          {user && <button className='sign-up' onClick={logOut}>Sign out</button>}
        </div>
      </motion.div>
    </div>
  )
}

export default Nav;