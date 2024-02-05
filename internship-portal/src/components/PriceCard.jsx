import React, { useEffect } from 'react';
import './PriceCard.css';
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";


const PriceCard = (props) => {
    const { title, price, description, features, color, type, unfeature } = props;

    const handleCheckout = async () => {
        let endpoint = '';
        if (type === 'pro') {
            endpoint = `${import.meta.env.VITE_BACKEND_URL}create-checkout-session-pro/${email}`;
        } else if (type === 'gold') {
            endpoint = `${import.meta.env.VITE_BACKEND_URL}create-checkout-session-gold/${email}`;
        }

        try {
            const response = await fetch(endpoint, { method: 'POST' });
            const session = await response.json();
            window.location.href = session.url;
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
            <div className='price-card'
                onClick={handleCheckout}
                style={{ border: `1px solid ${color}` }}>
                <div className='card-bubble'
                    style={{ border: `2px solid ${color}` }}>
                    <p className='bubble-text'>{title}</p>
                </div>
                <div className='container'>
                    <p className='price'>{price}<span> / month</span></p>
                    <p className='price-description'>{description}</p>
                </div>
                <div className='price-card-features'>
                    <ul>
                        {features.map((feature, key) => {
                            return <li key={key}>

                                <IoCheckmarkCircleOutline className='white-check' />
                                <span>{feature}</span>
                            </li>
                        })}
                        {
                            unfeature ? unfeature.map((feature, key) => {
                                return <li key={key} className='unfeature'>
                                    <IoIosCloseCircleOutline className='gray-x' />
                                    <span style={{ color: '#9a9c9f' }}>{feature}</span>
                                </li>
                            }) : null
                        }
                    </ul>
                </div>
                <div className='price-card-button'>
                    <button
                        style={
                            {
                                backgroundColor: `${color}`,
                            }
                        }>Get Started</button>
                </div>
            </div>
        )
    }

    export default PriceCard