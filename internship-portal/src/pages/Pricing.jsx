import React from 'react'
import Nav from '../components/Nav.jsx';
import './Pricing.css';
import PriceCard from '../components/PriceCard.jsx';

const Pricing = () => {
  return (
    <div className='page-container'>
        <header className='header'><Nav /></header>
        <div className="content">
            <div className="bubble">
                <p className='pricing'>Pricing</p>
            </div>
            <div className="pricing-title">
                <h1>Choose the plan that fits<br/><span className='your'>your</span> needs.</h1>
                <h2 className="subtitle">Internshark can be used for free. Pro members gain access to additional features<br/>and premium resources, unlocking the full potential of Internshark. </h2>
            </div>
            <div className='card-row'>
                <PriceCard 
                title='Free'
                price='$0'
                description='Free Version'
                features={[
                    'Search for internships',
                    'Save internships',
                    'Apply to internships',
                    'Access to Internshark resources'
                ]}/>
            </div>
        </div>
    </div>
  )
}

export default Pricing