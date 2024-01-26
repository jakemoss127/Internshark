import React from 'react'

const PriceCard = (props) => {
    const { title, price, description, features } = props
  return (
    <div className='price-card'>
        <div className='price-card-title'>
            <h1>{title}</h1>
            <p className='price'>{price}</p>
            <p className='description'>{description}</p>
        </div>
        <div className='price-card-features'>
            <ul>
                {features.map((feature) => {
                    return <li>{feature}</li>
                })}
            </ul>
        </div>
        <div className='price-card-button'>
            <button>Get Started</button>
        </div>
    </div>
  )
}

export default PriceCard