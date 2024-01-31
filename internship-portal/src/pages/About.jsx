import React from 'react';
import './About.css';
import Nav from '../components/Nav.jsx';
import Moss from '../assets/moss.png';
import Behar from '../assets/seth.jpg';
import { FaLinkedin } from "react-icons/fa";
import { color } from 'framer-motion';


const About = () => {
  return (
    <div className='about-container'>
        <Nav />
        <div className='content'>
            <div className='content-row'>
                <h1 className='description-title'>
                    For <span style={{color: '#327ee2', fontWeight: '600'}}>Students</span>, By <span style={{color: '#327ee2', fontWeight: '600'}}>Students</span>.
                </h1>
                <p className='description'>Internshark is a web application designed to help students apply to internship programs.<br/>
                Our state of the art chart technology is a one stop shop for students to mass apply<br/>
                to job roles around the US. Pro members gain a massive competitive edge, as <br />Internshark allows one to send hundreds of applications a day. </p>
            </div>
        </div>
        <div className='team-container'>
            <h1 className='team-title'>Meet The <span style={{
                color: '#327ee2',
                fontWeight: '600'
            }}>Team</span></h1>
            <div className="team-row">
                <div className='team-card'>
                    <img src={Moss} className='team-img' alt='Moss' />
                    <h1 className='team-name'>Jacob Moss</h1>
                    <h2 className='team-role'>Co-Founder</h2>
                    <div className="icon-row"><FaLinkedin className='white-icon'/></div>
                </div>
                <div className='team-card'>
                <img src={Behar} className='team-img' alt='Moss' />
                    <h1 className='team-name'>Seth Behar</h1>
                    <h2 className='team-role'>Co-Founder</h2>
                    <div className="icon-row"><FaLinkedin className='white-icon'/></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About