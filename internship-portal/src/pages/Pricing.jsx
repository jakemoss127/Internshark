import React, { useEffect } from 'react'
import Nav from '../components/Nav.jsx';
import './Pricing.css';
import PriceCard from '../components/PriceCard.jsx';
import { UserAuth } from '../context/AuthContext';
 

const Pricing = () => {

    return (
        <div className='page-container'>
            <header className='header'><Nav /></header>
            <div className="content">
                <div className="bubble">
                    <p className='pricing'>Pricing</p>
                </div>
                <div className="pricing-title">
                    <h1>Choose the plan that fits<br /><span className='your'>your</span> needs.</h1>
                    <h2 className="subtitle">Internshark can be used for free. Pro members gain access to additional features<br />and premium resources, unlocking the full potential of Internshark. </h2>
                </div>
                <div className='card-row'>
                    <PriceCard
                        title='Free'
                        price='$0.00'
                        description='Free Version'
                        features={[
                            'View 5 most recent internships',
                            'Apply to internships',
                        ]}
                        unfeature={[
                            'No tracking internships',
                            'No access to major tables'
                        ]}
                        color='#FFFFFF50' />
                    <PriceCard
                        title='Pro'
                        type="pro"
                        price='$7.99'
                        description='Free Version'
                        features={[
                            'View all internship listings',
                            'Track internship applications',
                            'Apply to internships',
                            'Access to one major table'
                        ]}
                        color='#327ee2' />
                    <PriceCard
                        title='Gold'
                        type="gold"
                        price='$11.99'
                        description='Free Version'
                        features={[
                            'View all internship listings',
                            'Track internship applications',
                            'Apply to internships',
                            'Access to all major tables'
                        ]}
                        color='#d4af37' />
                </div>
            </div>
        </div>
    )
}

export default Pricing