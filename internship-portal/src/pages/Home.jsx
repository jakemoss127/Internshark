import { useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { motion, useScroll } from 'framer-motion';
import './Home.css';
import heroImage from '../assets/hero-image.jpg';
import collegeSvg from '../assets/colleges2.svg';

function Home() {
  return (
    <div className="Home">
      <div className='hero'>
        <div className="nav-container">
          <header>
            <Nav />
          </header>
        </div>
        <motion.div className='title-container'>
          <h1 className='title'>
            The Student-First Internship Portal
          </h1>
          <h2 className='subtitle'>
            Internshark provides students with an upper-hand on applying to internship programs in the US.
          </h2>
          <div className="button-container">
            <button className='see-more'>
              View the List
            </button>
            <a>About</a>
          </div>
        </motion.div>
        <div className='footer-image'>
          <img src={heroImage} alt="hero-image" />
        </div>
      </div>
      <div className='features-section'>
        <h1 className='feature-title'>Our Features Transcend The Usual</h1>
        <div className='feature-row'>
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
      </motion.div>
      </motion.div>
      <section className='footer'>
        <Footer />
      </section>
    </div>
  )
}

export default Home
