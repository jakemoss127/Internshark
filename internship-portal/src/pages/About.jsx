import React from 'react';
import './About.css';
import Nav from '../components/Nav.jsx';
import Moss from '../assets/moss.png';
import Behar from '../assets/seth.jpg';

const About = () => {
  return (
    <div className='about-container'>
        <Nav />
        <div className='content'>
            <div className='content-row'>
                <h1 className='description-title'>
                    For Students, By Students.
                </h1>
                <p className='description'>Internshark is a web application designed to help students apply to internship programs.<br/>
                Our state of the art chart technology is a one stop shop for students to mass apply<br/>
                to job roles around the US. Pro members gain a massive competitive edge, as <br />Internshark allows one to send hundreds of applications a day. </p>
            </div>
        </div>
        <div className='team-container'>
            <h1 className='team-title'>Meet our team</h1>
            <div className="team-row">
                <div className='team-card'>
                    <img src={Moss} className='team-img' alt='Moss' />
                    <h1 className='team-name'>Jacob Moss</h1>
                    <h2 className='team-role'>Co-Founder and Software Engineer</h2>
                    <p className='person-description'>Jacob is a Junior Computer Science student <br/>at The University of Florida. He has experience working in React, JS, HTML, & CSS and loves creative development. Jacob also has industry experience as a SWE intern at Humana</p>
                </div>
                <div className='team-card'>
                <img src={Behar} className='team-img' alt='Moss' />
                    <h1 className='team-name'>Seth Behar</h1>
                    <h2 className='team-role'>Co-Founder and Software Engineer</h2>
                    <p className='person-description'>Seth is also a Junior Computer Science student <br/>at The University of Florida. He has experience working in SQL, MongoDB, as well as a previous internship as a SWE at eBacon</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About