import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../Components/Button/Button'

const ResponsiveNavbar = ({ handleModal, setShowNavbar }) => {
    const [dropdown, setDropdown] = useState(false)
    return (
        <>
            <div className='responsive_navbar_wrapper'>
                <Link onClick={(() => { setShowNavbar(false) })} to={'/'}>Home</Link>
                <Link onClick={(() => { setShowNavbar(false) })} to={'/about'}>About Us</Link>
                <Link className='program_links456' onClick={(() => setDropdown(!dropdown))}>Programs <i class="fa-solid fa-angle-down"></i></Link>
                {dropdown && <div className='program_links_wrapper'>
                    <Link to={'/program/yoga'}>Yoga</Link>
                    <Link to={'/program/life-coaching'}>Life Coaching</Link>
                    <Link to={'/program/coaches'}>Coaches</Link>
                </div>}
                <Link onClick={(() => { setShowNavbar(false) })} to={'/articles'}>Articles</Link>
                <Link onClick={(() => { setShowNavbar(false) })} to={'/contact'}>Contact Us</Link>
                <div onClick={(() => {
                    handleModal(1)
                    setShowNavbar(false)
                })}>
                    <Button children={'Login/SignUp'} />
                </div>

            </div>
        </>
    )
}

export default ResponsiveNavbar
