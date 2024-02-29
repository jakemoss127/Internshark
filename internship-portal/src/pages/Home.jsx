import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import { motion } from "framer-motion";
import "./Home.css";
import collegeSvg from "../assets/colleges2.svg";
import arrow from "../assets/arrow.svg";
import ReactPlayer from "react-player/youtube";
import { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import { ImEnter } from "react-icons/im";
import { ImClipboard } from "react-icons/im";
import { ImBooks } from "react-icons/im";
import { ImCoinDollar } from "react-icons/im";
import { ImSphere } from "react-icons/im";
import Shark from "../assets/shark.json";
import Lottie from "lottie-react";

function Home() {
  const [totalInternships, setTotalInternships] = useState();
  const [buttonPopup, setButtonPopup] = useState(false);

  const fetchTotal = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}total-jobs`,
      );
      const json = await response.json();
      setTotalInternships(json.totaljobs);
      console.log(json);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchTotal();
  }, []);

  return (
    <div className="Home">
      <div className="hero">
        <div className="nav-container">
          <header>
            <Nav />
          </header>
        </div>
        <motion.div className="title-container">
          <h1 className="title">The Student-First Internship Portal</h1>
          <motion.h2
            className="total-internships"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            Explore over{" "}
            <span className="internship-number">
              {totalInternships || 1500}
            </span>{" "}
            internships
          </motion.h2>
          <h3 className="subtitle">
            Internshark is a web application designed to help students
            consistently mass
            <br />
            apply to internship programs around the United States.
          </h3>
          <div className="button-container">
            <a href="/chart">
              <button className="see-more">View the List</button>
            </a>
            <a href="/pricing">
              <button className="get-started">Get Started</button>
            </a>
          </div>
          <div className="free-row">
            <div className="el1"></div>
            <div className="el2">
              <p className="free">
                Get started with a completely free plan on us.{" "}
                <a href="/pricing">
                  <span className="under">See our pricing →</span>
                </a>
              </p>
            </div>
            <div className="el3">
              <div className="arrow-wrapper">
                <p className="how-works">
                  How <span className="under">Internshark</span> works
                </p>
                <img
                  src={arrow}
                  alt="arrow"
                  className="arrow"
                  style={{ maxWidth: "50px", maxHeight: "50px" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="video-player"
          initial={{ y: 400 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <ReactPlayer
            url="https://youtu.be/iTMLC-pSQmY"
            controls={true}
            width="100%"
            height="100%"
          />
        </motion.div>
      </div>
      <motion.div className="trusted-section">
        <h1 className="trusted-title">Trusted by students at</h1>
        <motion.div
          className="image-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <img src={collegeSvg} alt="colleges" className="college-svg" />
        </motion.div>
      </motion.div>
      <div className="feature-section">
        <motion.div
          className="feature-titles"
          // initial={{ x: -800 }}
          // whileInView={{ x: 0 }}
          // transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="bubble">
            <p className="feature-bubble">Features</p>
          </div>
          <h1 className="our-features">
            Our <span style={{ color: "#327ee2" }}>Stand-Out</span> Features
          </h1>
          <p className="sub-features">
            Internshark's powerful features help students find internships
            faster and more efficiently.
            <br />
            From mass applying to tracking applications, we've got you covered.
          </p>
        </motion.div>
        <div className="feature-grid">
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
        </div>
      </div>
      <div className="get-started-section">
        <h1 className="our-features">
          Get Started With{" "}
          <span
            style={{
              color: "#327eeb",
            }}
          >
            Internshark{" "}
          </span>
          Today
        </h1>
        <p className="subtitle" style={{ maxWidth: "60%" }}>
          Internshark goes beyond a typical internship platform; it's a
          game-changer in how you view and shape your career. Unlike traditional
          job searches, it transforms your approach to career development,
          offering more than just temporary positions.
        </p>
        <div className="button-container">
          <button className="more-info">More Information</button>
          <button className="sign-started">Sign Up</button>
        </div>
        <Lottie
          className="shark"
          animationData={Shark}
          style={{ width: "30%", height: "50%", filter: "grayscale(1)" }}
        />
      </div>
      {/* <section className='footer'>
        <Footer />
      </section> */}
    </div>
  );
}

export default Home;
