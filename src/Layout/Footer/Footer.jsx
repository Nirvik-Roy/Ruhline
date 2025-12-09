import React from 'react'
import './Footer.css'
import logo from '../../assets/Images/Frame 1984078480 (1).svg'
import { Link } from 'react-router-dom'
import location from '../../assets/Images/icon.svg'
import message from '../../assets/Images/icon (1).svg'
import facebook from '../../assets/Images/social.svg'
import telegram from '../../assets/Images/social (1).svg'
import instagram from '../../assets/Images/social (2).svg'
const Footer = () => {
  return (
    <>
      <div className='footer_wrapper'>
        <div className='all_Container footer_content_wrapper'>

          <div className='footer_1'>
            <img src={logo} />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Phasellus euismod, justo in porttitor dignissim, urna lacus vehicula</p>
          </div>
          <div className='footer_2'>
            <h3>Company</h3>
            <div className='footer_2_links_wrapper'>
              <div className='footer_2_links'>
                <Link>Home</Link>
                <Link>About Us</Link>
                <Link>Programs</Link>
                <Link>Articles</Link>
                <Link>Contact Us</Link>
              </div>
              <div className='footer_2_links'>
                <Link>My Account</Link>
                <Link>Become a Coach</Link>
                <Link>Terms & Conditions</Link>
                <Link>Privacy Policy</Link>
                <Link>Refund Policy</Link>
              </div>
            </div>
          </div>
          <div className='footer_3'>
            <h3>Contact Us</h3>
            <div className='footer_location'>
              <img src={location} />
              <p>Wisconsin Ave, Suite 700 <br />
                Chevy Chase, Lorem 20815</p>
            </div>

            <div className='footer_location'>
              <img src={message} />
              <p>bidishabhowmick6@gmail.com</p>
            </div>

            <div className='footer_follow_us_wrapper'>
              <h5>Follow Us</h5>
              <div className='footer_img_wrapper'>
                <img src={facebook} />
                <img src={telegram} />
                <img src={instagram} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='copyright_wrapper'>
        <div className='all_Container'>
          <p>© 2025 All Rights Reserved  |  Designed and Developed by Web Prism Dynamics</p>

        </div>
      </div>
    </>
  )
}

export default Footer
