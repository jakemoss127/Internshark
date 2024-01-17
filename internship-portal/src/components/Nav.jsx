import React from 'react'
import './Nav.css'
import internlogo from '../assets/internshark.svg'

const Nav = () => {
  return (
    <div className='nav-border'>
        <div className='logo-container'>
          <img src={internlogo} alt="Internshark Logo" className="logo" style={{maxHeight: '25px', maxWidth: '25px'}}/>
          <h1 className="logo-text">Internshark</h1>
        </div>
        <div className="middle-menu">
          <nav className="navbar">
            <a>Home</a>
            <a>Pricing</a>
            <a>GitHub</a>
            <a>News</a>
            <a>Chart</a>
          </nav>
        </div>
        <div className="authentication-menu">
          <a>Sign In</a>
          <button className='sign-up'>Get Started</button>
        </div>
    </div>
  )
}

export default Nav