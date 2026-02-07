import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../assets/Images/Frame 1984078480.svg'
import NavbarLinks from './NavbarLinks'
import { useNavigate } from 'react-router-dom'
import ResponsiveNavbar from './ResponsiveNavbar'
const Navbar = ({ navbarData }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className='navbar_wrapper_main'>
                <div className='navbar_content_wrapper all_Container'>
                    <img onClick={(() => navigate('/'))} className='nav_logo'  src={navbarData?.header_logo || logo} />
                    <NavbarLinks/>
                </div>

            </div>
        </>
    )
}

export default Navbar
