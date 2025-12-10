import React from 'react'
import './AboutUs.css'
import HomeAbout from '../HomePage/HomeAbout/HomeAbout'
import BannerLayout from '../BannerLayout/BannerLayout'
import AboutCards from './AboutCards/AboutCards'
import MeetFounder from './MeetFounder/MeetFounder'
const AboutUs = () => {
    return (
        <>
          <BannerLayout title={'About Us'}/>
          <HomeAbout/>
          <AboutCards/>
          <MeetFounder/>
        </>
    )
}

export default AboutUs
