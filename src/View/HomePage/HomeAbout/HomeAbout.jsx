import React from 'react'
import './HomeAbout.css'
import aboutImg from '../../../assets/Images/Rectangle 445.svg'
import HomeAboutContent from './HomeAboutContent'
const HomeAbout = () => {
  return (
    <>
      <div className='about_us_wrapper'>
        <div className='all_Container about_us_content_wrapper'>
         <div className='about_us_image'>
            <img src={aboutImg}/>
         </div>
         <HomeAboutContent/>
        </div>
      </div>
    </>
  )
}

export default HomeAbout
