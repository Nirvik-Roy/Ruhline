import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import Button from '../../Components/Button/Button'
import down from '../../assets/Images/arrow-right.svg'
const NavbarLinks = () => {
    return (
        <>
            <div className='nav_links_wrapper'>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/about'}>About Us</NavLink>
                <div className={'programs_link'} to={'/programs'}>Programs <img src={down}/></div>
                <NavLink to={'/articles'}>Articles</NavLink>
                <NavLink to={'/contact'}>Contact Us</NavLink>
                <Button children={'Login/Sign Up'}/>
            </div>
        </>
    )
}

export default NavbarLinks
