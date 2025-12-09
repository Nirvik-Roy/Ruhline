import React from 'react'
import './HomeBanner.css'
import text from '../../../assets/Images/Find Your Inner Balance.svg'
const HomeBanner = () => {
  return (
    <>
      <div className='home_banner_Wrappper'>
        <div className='home_banner_content_wrapper'>
          <img src={text} />
          <div className='banner_para'>
          <p>Step onto your mat and let go of the chaos around you. Our guided yoga and meditation sessions help you reconnect with your inner peace, build flexibility, and restore harmony between your mind, body, and soul.</p>

          </div>
          <button>Get Started</button>
        </div>
      </div>
    </>
  )
}

export default HomeBanner
