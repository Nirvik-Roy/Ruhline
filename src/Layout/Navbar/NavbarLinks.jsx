import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../Components/Button/Button'
import down from '../../assets/Images/arrow-right.svg'
import Modal from '../../Components/Modal/Modal'
import Input from '../../Components/Inputs/Input'
import eye from '../../assets/Images/Union (3).png'
import tick from '../../assets/Images/Union (4).png'
import GoogleAppleLogin from '../../Components/GoogleAppleLogin/GoogleAppleLogin'
const NavbarLinks = () => {
    const [modalToggle, setmodalToggle] = useState({
        signUp: false,
        signIn: false,
        forGotPassword: false,
        newPassword: false,
    })
    const navigate = useNavigate()
    const location = useLocation()

    const [dropdown, setDropdown] = useState(false)

    const handleModal = (i) => {
        setmodalToggle({
            signUp: i === 1 ? true : false,
            signIn: i === 2 ? true : false,
            forGotPassword: i === 3 ? true : false,
            newPassword: i === 4 ? true : false
        })

    }
    const SignUpmodalData = () => {
        return (
            <>
                <div className='sign_up_wrapper'>
                    <h3>Sign Up</h3>
                    <p>Already have an account? <span onClick={(() => handleModal(2))}>Log In</span></p>

                    <form className='modal_form'>
                        <div className='modal_form_grid_wrapper'>
                            <Input type={'text'} label={'First Name'} required={true} placeholder={'Somali'} />
                            <Input type={'text'} label={'Last Name'} required={true} placeholder={'Goswami'} />
                        </div>
                        <Input type={'text'} label={'Email Address'} required={true} placeholder={'Goswami'} />
                        <div className='input_form' style={{
                            position: 'relative'
                        }}>
                            <label>Password <span>*</span></label>
                            <input style={{
                                padding: '0 40px 0 15px '
                            }} type='password' placeholder='*********' />
                            <img style={{
                                position: 'absolute',
                                top: '47px',
                                right: '10px',
                                width: '20px',
                                cursor: 'pointer'
                            }} src={eye} />

                            <img style={{
                                position: 'absolute',
                                top: '50px',
                                right: '40px',
                                width: '15px',
                                cursor: 'pointer'
                            }} src={tick} />
                            <small style={{
                                marginLeft: '15px',
                                fontSize: '11px'
                            }}>8+ characters</small>
                        </div>

                        <div className='checkbox_wrapper'>
                            <input type='checkbox' />
                            <p>By continuing I agree with the Terms & Conditions, Privacy Policy</p>
                        </div>
                        <Button children={'Create Account'} styles={{ width: '100%', padding: '17px 0px' }} />
                        <GoogleAppleLogin />
                    </form>
                </div>

            </>
        )
    }


    const SignInmodalData = () => {
        return (
            <>
                <div className='sign_up_wrapper sign_in_wrapper'>
                    <h3>Log in</h3>
                    <p>Don't have an account yet? <span onClick={(() => handleModal(1))}>Sign up </span>for free</p>

                    <form className='modal_form'>
                        <Input type={'text'} label={'Email Address'} required={true} placeholder={'Goswami'} />
                        <div className='input_form' style={{
                            position: 'relative'
                        }}>
                            <label>Password <span>*</span></label>
                            <input style={{
                                padding: '0 40px 0 15px '
                            }} type='password' placeholder='*********' />
                            <img style={{
                                position: 'absolute',
                                top: '47px',
                                right: '10px',
                                width: '20px',
                                cursor: 'pointer'
                            }} src={eye} />

                            <img style={{
                                position: 'absolute',
                                top: '50px',
                                right: '40px',
                                width: '15px',
                                cursor: 'pointer'
                            }} src={tick} />
                            <small onClick={(() => handleModal(3))} style={{
                                marginLeft: '15px',
                                fontSize: '11px',
                                marginLeft: 'auto',
                                color: 'rgba(255, 0, 0, 1)',
                                cursor: 'pointer'
                            }}>Forget Password?</small>
                        </div>
                        <Button children={'Login'} styles={{ width: '100%', padding: '17px 0px' }} />
                        <GoogleAppleLogin />
                    </form>
                </div>
            </>
        )
    }


    const ForgotPassword = () => {
        return (
            <>
                <div className='sign_up_wrapper' style={{
                    height: 'fit-content'
                }}>
                    <h3>Lost your password?</h3>
                    <p>Please enter your username or email address. You will receive a link to create a new password via email.
                        Remember now? <span onClick={(() => handleModal(2))}>Back to login
                        </span></p>

                    <form className='modal_form'>
                        <Input type={'text'} label={'Email Address'} required={true} placeholder={'example@mail.com'} />
                        <div onClick={(() => handleModal(4))}>
                            <Button children={'Send Link'} styles={{ width: '100%', padding: '17px 0px' }} />

                        </div>
                    </form>
                </div>
            </>
        )
    }

    const newPassword = () => {
        return (
            <>
                <div className='sign_up_wrapper' style={{
                    height: 'fit-content'
                }}>
                    <h3>Create a new password</h3>
                    <form className='modal_form'>
                        <div className='input_form' style={{
                            position: 'relative'
                        }}>
                            <label> Password <span>*</span></label>
                            <input style={{
                                padding: '0 40px 0 15px '
                            }} type='password' placeholder='*********' />
                            <img style={{
                                position: 'absolute',
                                top: '47px',
                                right: '10px',
                                width: '20px',
                                cursor: 'pointer'
                            }} src={eye} />

                        </div>
                        <div className='input_form' style={{
                            position: 'relative'
                        }}>
                            <label>Confirm Password <span>*</span></label>
                            <input style={{
                                padding: '0 40px 0 15px '
                            }} type='password' placeholder='*********' />
                            <img style={{
                                position: 'absolute',
                                top: '47px',
                                right: '10px',
                                width: '20px',
                                cursor: 'pointer'
                            }} src={eye} />

                            <img style={{
                                position: 'absolute',
                                top: '50px',
                                right: '40px',
                                width: '15px',
                                cursor: 'pointer'
                            }} src={tick} />
                            <small style={{
                                marginLeft: '15px',
                                fontSize: '11px'
                            }}>8+ characters</small>
                        </div>


                        <Button children={'Create'} styles={{ width: '100%', padding: '17px 0px' }} />

                    </form>
                </div>
            </>
        )
    }

    useEffect(()=>{
     setDropdown(false)
    },[location.pathname])
    return (
        <>
            {modalToggle.signUp && <Modal children={SignUpmodalData()} handleModal={handleModal} />}
            {modalToggle.signIn && <Modal children={SignInmodalData()} handleModal={handleModal} />}
            {modalToggle.forGotPassword && <Modal children={ForgotPassword()} handleModal={handleModal} />}
            {modalToggle.newPassword && <Modal children={newPassword()} handleModal={handleModal} />}
            <div className='nav_links_wrapper'>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/about'}>About Us</NavLink>
                <div className={'programs_link'} onClick={(()=>setDropdown(!dropdown))}>

                    Programs <img src={down} />
                    {dropdown && <div onClick={((e)=>e.stopPropagation())} className='program_dropdown'>
                        <p onClick={(()=>navigate('/program/yoga'))}>Yoga</p>
                        <p onClick={(()=>navigate('/program/life-coaching'))}>Life Coaching</p>
                        <p  onClick={(()=>navigate('/program/coaches'))}>Coaches</p>
                    </div>}

                </div>
                <NavLink to={'/articles'}>Articles</NavLink>
                <NavLink to={'/contact'}>Contact Us</NavLink>
                <div onClick={(() => handleModal(1))}>
                    <Button children={'Login/Sign Up'} />
                </div>
                <i class="fa-solid fa-bars"></i>
            </div>
        </>
    )
}

export default NavbarLinks
