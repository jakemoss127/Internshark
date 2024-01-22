import React from 'react'
import './Footer.css'
import { FaGithub } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='footer-container'>
        <div className='footer-row'>
            <FaGithub className='white'/>
            <FaTiktok className='white'/>
            <FaLinkedin className='white'/>
            <FaSquareInstagram className='white'/>
        </div>
        <div className="all-rights">
            <p>© 2024 Internshark. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer