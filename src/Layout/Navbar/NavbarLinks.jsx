import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import Button from '../../Components/Button/Button'
import down from '../../assets/Images/arrow-right.svg'
import Modal from '../../Components/Modal/Modal'
import Input from '../../Components/Inputs/Input'
const NavbarLinks = () => {
    const SignUpmodalData = () => {
        return (
            <>
                <div className='sign_up_wrapper'>
                    <h3>Sign Up</h3>
                    <p>Already have an account? <span>Log In</span></p>

                    <form className='modal_form'>
                        <div className='modal_form_grid_wrapper'>
                            <Input type={'text'} label={'First Name'} required={true} placeholder={'Somali'} />
                            <Input type={'text'} label={'Last Name'} required={true} placeholder={'Goswami'} />
                        </div>
                        <Input type={'text'} label={'Email Address'} required={true} placeholder={'Goswami'} />

                    </form>
                </div>

            </>
        )
    }
    return (
        <>
            {/* <Modal children={SignUpmodalData()} /> */}
            <div className='nav_links_wrapper'>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/about'}>About Us</NavLink>
                <div className={'programs_link'} to={'/programs'}>Programs <img src={down} /></div>
                <NavLink to={'/articles'}>Articles</NavLink>
                <NavLink to={'/contact'}>Contact Us</NavLink>
                <Button children={'Login/Sign Up'} />
            </div>
        </>
    )
}

export default NavbarLinks
