import React from 'react';
import './PriceCard.css';
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const PriceCard = (props) => {
    const { title, price, description, features, color } = props

    const handleCheckout = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}create-checkout-session`, { method: 'POST' });
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
                            
                            <IoCheckmarkCircleOutline className='white-icon' />
                            <span>{feature}</span>
                        </li>
                    })}
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