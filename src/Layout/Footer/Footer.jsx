import React, { useState, useEffect } from 'react'
import './Footer.css'
import logo from '../../assets/Images/Frame 1984078480 (1).svg'
import { Link } from 'react-router-dom'
import location from '../../assets/Images/icon.svg'
import message from '../../assets/Images/icon (1).svg'
import facebook from '../../assets/Images/social (2).svg'
import telegram from '../../assets/Images/social (1).svg'
import instagram from '../../assets/Images/social (3).svg'
import Loaders from '../../Components/Loaders/Loaders'
import { getAllCmsData } from '../../utils/cms'
const Footer = ({ footerData }) => {
  return (
    <>
      <div className='footer_wrapper'>
        <div className='all_Container footer_content_wrapper'>

          <div className='footer_1'>
            <img src={footerData?.footer_logo || logo} />
            <p dangerouslySetInnerHTML={{
              __html: footerData?.footer_description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus euismod, justo in porttitor dignissim, urna lacus vehicula"
            }}></p>
          </div>
          <div className='footer_2'>
            <h3>Company</h3>
            <div className='footer_2_links_wrapper'>
              <div className='footer_2_links'>
                <Link to={'/'}>Home</Link>
                <Link to={'/about'}>About Us</Link>
                <Link to={'/program/yoga'}>Programs</Link>
                <Link to={'/articles'}>Articles</Link>
                <Link to={'/contact'}>Contact Us</Link>
              </div>
              <div className='footer_2_links'>
                <Link>My Account</Link>
                <Link>Become a Coach</Link>
                <Link to={'/terms-conditions'}>Terms & Conditions</Link>
                <Link to={'/privacy-policy'}>Privacy Policy</Link>
                <Link to={'/refund-policy'}>Refund Policy</Link>
              </div>
            </div>
          </div>
          <div className='footer_3'>
            <h3>Contact Us</h3>
            {/* <div className='footer_location' >
              <img src={location} />
              <div>
                <p dangerouslySetInnerHTML={{
                  __html: footerData?.address.address_line_1
                    || "Wisconsin Ave, Suite 700"
                }}></p>

                <p dangerouslySetInnerHTML={{
                  __html: footerData?.address.address_line_2
                    || "Chevy Chase, Lorem 20815"
                }}></p>
              </div>
       
            </div> */}

            <div className='footer_location'>
              <img src={message} />
              <p>bidishabhowmick6@gmail.com</p>
            </div>

            <div className='footer_follow_us_wrapper'>
              <h5>Follow Us</h5>
              <div className='footer_img_wrapper'>
                <div className='footer_icon'>
                  <img onClick={(() => window.open(`${footerData?.social_media.facebook_url || 'https://www.facebook.com/'}`))} src={facebook} />
                </div>

                <div className='footer_icon'>
                  <img onClick={(() => window.open(`${footerData?.social_media.linkedin_url || 'https://in.linkedin.com/'}`))} src={telegram} />
                </div>

                <div className='footer_icon'>
                  <img onClick={(() => window.open(`${footerData?.social_media.instagram_url || 'https://www.instagram.com/'}`))} src={instagram} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='copyright_wrapper'>
        <div className='all_Container'>
          <p dangerouslySetInnerHTML={{
            __html: footerData?.copyright || "© 2025 All Rights Reserved  |  Designed and Developed by Web Prism Dynamics"
          }}></p>
        </div>
      </div>
    </>
  )
}

export default Footer
