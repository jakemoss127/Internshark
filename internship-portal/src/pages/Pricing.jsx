import React from 'react'
import Nav from '../components/Nav.jsx';
import './Pricing.css';

const Pricing = () => {
  return (
    <div className='page-container'>
        <header>
            <Nav />
        </header>
        <div className="content-container">
            <div className='card card-green'>
                <div className="info">
                    <h1 className='card-title'>Basic</h1>
                    <h2 className='card-subtitle'>Free</h2>
                    <p className="description">
                        Get started with Internshark's free plan.
                    </p>
                    <ul className="features">
                        <li>Access the 5 most recent listings</li>
                        <li>Limited access to news articles</li>
                        <li>GitHub source code not available</li>
                    </ul>
                </div>
                <div className="button-container">
                    <button className='sign-up'>Start Free Plan</button>
                </div>
            </div>
            <div className='card card-blue'> 
                <div className="info">
                    <h1 className='card-title'>Basic</h1>
                    <h2 className='card-subtitle'>Free</h2>
                    <p className="description">
                        Get started with Internshark's free plan.
                    </p>
                    <ul className="features">
                        <li>Access the 5 most recent listings</li>
                        <li>Limited access to news articles</li>
                        <li>GitHub source code not available</li>
                    </ul>
                </div>
                <div className="button-container">
                    <button className='sign-up'>Start Free Plan</button>
                </div>
            </div>
            <div className='card card-red'>
                <div className="info">
                    <h1 className='card-title'>Basic</h1>
                    <h2 className='card-subtitle'>Free</h2>
                    <p className="description">
                        Get started with Internshark's free plan.
                    </p>
                    <ul className="features">
                        <li>Access the 5 most recent listings</li>
                        <li>Limited access to news articles</li>
                        <li>GitHub source code not available</li>
                    </ul>
                </div>
                <div className="button-container">
                    <button className='sign-up'>Start Free Plan</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Pricing