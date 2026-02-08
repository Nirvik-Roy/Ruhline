import React, { useState } from 'react'
import './HomeBanner.css'
import fallbackImg from "../../../assets/Images/WhatsApp Image 2025-11-03 at 18.52.46_1d39b650 1.svg";
import Loaders from '../../../Components/Loaders/Loaders.jsx'
import { useNavigate } from 'react-router-dom'
const HomeBanner = ({ data }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading && <Loaders/>}
      <div className='home_banner_Wrappper' style={{
        position:'relative'
      }}>
        <img onLoad={() => setIsLoading(false)} style={{
          position:'absolute',
          zIndex:'-1',
          top:'0',
          left:'0',
          width:'100%',
          height:'100%'
        }} src={data?.hero_section_image || fallbackImg}/>
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
