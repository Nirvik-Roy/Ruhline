import React from 'react'
import './Navbar.css'
import logo from '../../assets/Images/Frame 1984078480.svg'
import NavbarLinks from './NavbarLinks'
const Navbar = () => {
    return (
        <>
            <div className='navbar_wrapper_main'>
                <div className='navbar_content_wrapper all_Container'>
                    <img className='nav_logo' src={logo} />
                    <NavbarLinks/>
                </div>
            </div>
        </>
    )
}

export default Navbar
