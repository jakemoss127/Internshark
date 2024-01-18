import { useState } from 'react';
import Nav from './components/Nav.jsx';
import { motion } from 'framer-motion';
import './App.css';
import heroImage from './assets/hero-image.jpg';
import collegeSvg from './assets/colleges2.svg';

function App() {
  return (
    <div className="App">
      <div className='hero'>
        <div className="nav-container">
          <Nav />
        </div>
        <div className='title-container'>
          <h1 className='title'>
            The Premiere Internship Portal
          </h1>
          <h2 className='subtitle'>
            Internshark provides students with an upper-hand on applying to internship programs in the US.
          </h2>
          <div className="button-container">
            <button className='see-more'>
              View the List
            </button>
            <a>Other News</a>
          </div>
        </div>
        <div className='footer-image'>
          <img src={heroImage} alt="hero-image" />
        </div>
      </div>
      <motion.div className='trusted-section'>
        <h1 className='trusted-title'>Trusted by students at</h1>
        <motion.div className="image-container"
          initial={{opacity: 0}}
          whileInView={{ opacity: 1 }}
          transition={{duration: 1, ease: 'easeInOut'}}
        >
          <img src={collegeSvg} alt="colleges" className='college-svg' />
        <div className="hired-faster">
          <h1 className='title'>Get Hired Faster</h1>
          <h1 className="subtitle">Students using Intenrshark are more likely to be hired</h1>
        </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default App
