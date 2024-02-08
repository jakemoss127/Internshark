import React from 'react';
import './About.css';
import Nav from '../components/Nav.jsx';
import Moss from '../assets/moss.png';
import Behar from '../assets/seth.jpg';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { color } from 'framer-motion';


const About = () => {
  return (
    <div className='about-container'>
        <Nav />
        <div className='content'>
            <div className='content-row'>
                <h1 className='description-title'>
                   It All Started With A <span style={{
                       color: '#327ee2',
                       fontWeight: '600'
                   }}>Vision</span>
                </h1>
                <p className='description'>We know aquiring a top internship can oftentimes feel impossible. The constant pressure to find he right opportunity, coupled with the competitive nature of the job market, can make the process challenging. However, with determination, strategic planning, and a proactive approach, you can increase your chances of securing a valuable internship experience.</p>
                <p className="description">
                    We created Internshark knowing what it feels like to be in your shoes. Our mission is to help you navigate the internship process with ease, and to provide you with the tools and resources you need to succeed. We are committed to helping you find the right internship, and to providing you with the support you need to make the most of your experience.
                </p>
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
                    <div className="icon-row">
                        <FaLinkedin className='white-icon' onClick={() => {
                        window.open('https://www.linkedin.com/in/jacob-moss-uf/');
                        }}/>
                        <FaGithub className='white-icon' onClick={() => {
                        window.open('https://github.com/jakemoss127');
                        }}/>
                    </div>
                </div>
                <div className='team-card'>
                <img src={Behar} className='team-img' alt='Moss' />
                    <h1 className='team-name'>Seth Behar</h1>
                    <h2 className='team-role'>Co-Founder</h2>
                    <div className="icon-row">
                        <FaLinkedin className='white-icon' onClick={() => {
                            window.open('https://www.linkedin.com/in/jacob-moss-uf/');
                            }}/>
                        <FaGithub className='white-icon' onClick={() => {
                            window.open('https://github.com/jakemoss127');
                            }}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About