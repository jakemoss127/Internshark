import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { motion, useScroll } from 'framer-motion';
import './Home.css';
import heroImage from '../assets/hero-image.jpg';
import collegeSvg from '../assets/colleges2.svg';
import arrow from '../assets/arrow.svg';
import ReactPlayer from 'react-player/youtube';
import { useState, useEffect } from 'react';


function Home() {

  const [totalInternships, setTotalInternships] = useState()

  const fetchTotal = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}total-jobs`);
      const json = await response.json();
      setTotalInternships(json.totaljobs); 
      console.log(json)
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchTotal();
  }, []);

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
          <h2 className='total-internships'>Explore our <span style={{color: '#195CB6', fontSize: '1.7rem'}}>{totalInternships}</span> internships</h2>
          <h3 className='subtitle'>
            Internshark is a web application designed to help students consistently mass<br/>apply to internship programs around the United States. 
          </h3>
          <div className="button-container">
            <a href='/chart'>
              <button className='see-more'>
              View the List
              </button></a>
            <a href='/pricing'><button className='get-started'>Get Started</button></a>
          </div>
          <div className="free-row">
            <div className="el1">
            </div>
            <div className="el2">
              <p className='free'>Get started with a completely free plan on us. <a href='/pricing'><span className='under'>See our pricing →</span></a></p>
            </div>
            <div className="el3">
              <div className="arrow-wrapper">
                <p className='how-works'>
                 How <span className='under'>Internshark</span> works
                </p>
                <img src={arrow} alt="arrow" className='arrow' style={{ maxWidth: '50px', maxHeight: '50px' }} />
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div className='video-player'
          initial={{y: 400}}
          animate={{y: 0}}
          transition={{duration: 1, ease: 'easeInOut'}}
        >
          <ReactPlayer 
            url='hhttps://www.youtube.com/watch?v=1uEJT3_M1Y0&ab_channel=ProkshLuthra'
            controls={true}
            width='100%'
            height='100%'
          />
        </motion.div>
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
