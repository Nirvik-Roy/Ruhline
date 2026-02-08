import React from 'react'
import './HomeBanner.css'
import fallbackImg from "../../../assets/Images/WhatsApp Image 2025-11-03 at 18.52.46_1d39b650 1.svg";

import { useNavigate } from 'react-router-dom'
const HomeBanner = ({ data }) => {
  const navigate = useNavigate()
  return (
    <>
      <div className='home_banner_Wrappper' style={{
        backgroundImage: `url(${data?.hero_section_image || fallbackImg})`
      }}>
        <div className='home_banner_content_wrapper'>
          <h1 dangerouslySetInnerHTML={{
            __html: data?.hero_headline || "Find Your Inner Balance"
          }}>
          </h1>
          <div className='banner_para'>
            <p
              dangerouslySetInnerHTML={{
                __html: data?.hero_description || "Step onto your mat and let go of the chaos around you. Our guided yoga and meditation sessions help you reconnect with your inner peace, build flexibility, and restore harmony between your mind, body, and soul."
              }}
            ></p>


          </div>
          <button onClick={(() => navigate('/contact'))}>Get Started</button>
        </div>
      </div>
    </>
  )
}

export default HomeBanner
