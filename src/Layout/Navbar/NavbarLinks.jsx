import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../Components/Button/Button'
import down from '../../assets/Images/arrow-right.svg'
import Modal from '../../Components/Modal/Modal'
import Input from '../../Components/Inputs/Input'
import eye from '../../assets/Images/Union (3).png'
import tick from '../../assets/Images/Union (4).png'
import GoogleAppleLogin from '../../Components/GoogleAppleLogin/GoogleAppleLogin'
import ResponsiveNavbar from './ResponsiveNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { Authregister } from '../../../Store/Slices/Loginslice/RegisterSlice'
import VerifiedModal from '../../View/HomePage/VerifyModal/VerifiedModal.jsx'
import { Auth, AuthlogOut, verifyToken } from '../../../Store/Slices/Loginslice/AuthSlice.js'
import Loaders from '../../Components/Loaders/Loaders.jsx'
import toast from 'react-hot-toast'
import { userForgetPassword } from '../../utils/user.js'
import ResendLinkModal from '../../View/ResendLinkModal/ResendLinkModal.jsx'
import { getProgramCategory } from '../../utils/program'
const NavbarLinks = () => {
    const { isVerified, errors, isLogin, loginerrors, isLoading, isRegistration } = useSelector(state => state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [emailErrormessage, setEmailerrorMessage] = useState('');
    const [passwordMsg, setPasswordMsg] = useState("");
    const [programCategories, setprogramCategories] = useState()
    const [confirmPasswordMsg, setConfirmPasswordMsg] = useState("");
    const [programCategoryLoading, setprogramCategoryLoading] = useState(false)
    const [type, setType] = useState(false);
    const [type2, setType2] = useState(false);
    const [type3, setType3] = useState(false);
    const [forgotPasswordLoading, setforgotPasswordLoading] = useState(false);
    const [forgotPasswordErrors, setforgotPasswordErrorrs] = useState()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [reSendModal, setResendModal] = useState(false)
    const ValidateEmail = (email) => {
        if (!email) {
            return setEmailerrorMessage('* Email is Required')
        }
        if (!emailRegex.test(email)) {
            return setEmailerrorMessage('* Please Enter a vaild email address')
        }
        return setEmailerrorMessage('');
    }
    const validatePasswordMsg = (password) => {
        if (!password) return "";
        if (password.length < 8) {
            return "Password must be at least 8 characters";
        }
        return "";
    };

    const validateConfirmPasswordMsg = (password, confirmPassword) => {
        if (!confirmPassword) return "";
        if (password !== confirmPassword) {
            return "Password and Confirm Password should be same";
        }
        return "";
    };

    const [verifiedModal, setverifiedModal] = useState(false)
    const [modalToggle, setmodalToggle] = useState({
        signUp: false,
        signIn: false,
        forGotPassword: false,
        newPassword: false,
    })

    useEffect(() => {
        dispatch(verifyToken())
    }, [dispatch])

    useEffect(() => {
        if (isLogin) {
            navigate('/dashboard');
            setmodalToggle(0)
        }
    }, [isLogin])

    const [showNavbar, setShowNavbar] = useState(false)

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
    useEffect(() => {
        handleModal(0)
    }, [location.pathname])
    const [loginFormData, setloginFormdata] = useState({
        email: '',
        password: ''
    })

    const handleSignIn = () => {
        if (loginFormData.email != '' && loginFormData.password != '') {
            dispatch(Auth(loginFormData))
        }
    }

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        // if (name == 'email') {
        //     ValidateEmail(value)
        // }
        setloginFormdata({
            ...loginFormData,
            [name]: value
        })
    }

    const [registerFormData, setregisterFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        terms_accepted: false
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        // if (name === 'email') {
        //     ValidateEmail(value)
        // }
        if (name === "password") {
            setPasswordMsg(validatePasswordMsg(value));
            setConfirmPasswordMsg(
                validateConfirmPasswordMsg(value, registerFormData.password_confirmation)
            );
        }

        if (name === "password_confirmation") {
            setConfirmPasswordMsg(
                validateConfirmPasswordMsg(registerFormData.password, value)
            );
        }
        setregisterFormData({
            ...registerFormData,
            [name]: value
        })
    }

    const handleTermsCondition = () => {
        const data = { ...registerFormData };
        data.terms_accepted = !data.terms_accepted;
        setregisterFormData(data)
    }

    const handleSubmit = async () => {
        dispatch(Authregister(registerFormData));
    }

    useEffect(() => {
        if (isRegistration) {
            handleModal(0)
        }
    }, [isRegistration])


    const [email, setEmail] = useState({
        email: ''
    })

    const forgotPasswordHandle = (e) => {
        const { name, value } = e.target;
        // if (name === 'email') {
        //     ValidateEmail(value)
        // }
        setEmail({
            ...email,
            [name]: value
        })
    }

    const forGotPasswordSubmit = async () => {
        if (email.email != '') {
            setforgotPasswordLoading(true)
            try {
                const result = await userForgetPassword(email)
                setforgotPasswordErrorrs(result)
            } catch (err) {
                console.log(err)
            } finally {
                setforgotPasswordLoading(false)
            }
        } else {
            toast.error("plz fill the required filed..")
            setforgotPasswordLoading(false)
        }
    }

    useEffect(() => {
        setConfirmPasswordMsg("");
        setEmailerrorMessage("");
        setPasswordMsg("");
    }, [modalToggle])

    const SignUpmodalData = () => {
        return (
            <>
                <div className='sign_up_wrapper'>
                    <h3>Sign Up</h3>
                    <p>Already have an account? <span onClick={(() => handleModal(2))}>Log In</span></p>

                    <form className='modal_form'>
                        <div className='modal_form_grid_wrapper'>
                            <div>
                                <Input value={registerFormData.first_name} name={'first_name'} onChange={handleChange} type={'text'} label={'First Name'} required={true} placeholder={'Enter first name'} />
                                <small style={{
                                    marginLeft: '15px',
                                    fontSize: '11px',
                                    color: 'red'
                                }}>{errors.first_name && errors.first_name[0]}</small>
                            </div>
                            <div>
                                <Input value={registerFormData.last_name} name={'last_name'} onChange={handleChange} type={'text'} label={'Last Name'} required={true} placeholder={'Enter last name'} />
                                <small style={{
                                    marginLeft: '15px',
                                    fontSize: '11px',
                                    color: 'red'
                                }}>{errors.last_name && errors.last_name[0]}</small>
                            </div>
                        </div>
                        <div>
                            <Input value={registerFormData.email} name={'email'} onChange={handleChange} type={'text'} label={'Email Address'} required={true} placeholder={'Enter email address'} />
                            <small style={{
                                marginLeft: '15px',
                                fontSize: '11px',
                                color: 'red'
                            }}>{errors.email ? errors.email[0] : emailErrormessage}</small>


                        </div>
                        <div className='input_form' style={{
                            position: 'relative'
                        }}>
                            <label>Password <span>*</span></label>
                            <input value={registerFormData.password} name='password' onChange={handleChange} style={{
                                padding: '0 40px 0 15px '
                            }} type={type ? 'text' : 'password'} placeholder='*********' />
                            {type && <i style={{
                                position: 'absolute',
                                top: '47px',
                                right: '10px',
                                width: '20px',
                                cursor: 'pointer'
                            }} class="fa-regular fa-eye" onClick={(() => setType(!type))}></i>}

                            {!type && <i style={{
                                position: 'absolute',
                                top: '47px',
                                right: '10px',
                                width: '20px',
                                cursor: 'pointer'
                            }} class="fa-regular fa-eye-slash" onClick={(() => setType(!type))}></i>}

                            {/* <img style={{
                                position: 'absolute',
                                top: '50px',
                                right: '40px',
                                width: '15px',
                                cursor: 'pointer'
                            }} src={tick} /> */}
                            <small style={{
                                marginLeft: '15px',
                                fontSize: '11px',
                                marginTop: '0px',
                                color: 'rgba(255, 0, 0, 1)',
                                cursor: 'pointer'
                            }}>{errors?.password ? errors?.password[0] : passwordMsg}</small>

                        </div>



                        <div className='input_form' style={{
                            position: 'relative'
                        }}>
                            <label>Confirm Password <span>*</span></label>
                            <input value={registerFormData.password_confirmation} name='password_confirmation' onChange={handleChange} style={{
                                padding: '0 40px 0 15px '
                            }} type={type2 ? 'text' : 'password'} placeholder='*********' />
                            {type2 && <i style={{
                                position: 'absolute',
                                top: '47px',
                                right: '10px',
                                width: '20px',
                                cursor: 'pointer'
                            }} class="fa-regular fa-eye" onClick={(() => setType2(!type2))}></i>}

                            {!type2 && <i style={{
                                position: 'absolute',
                                top: '47px',
                                right: '10px',
                                width: '20px',
                                cursor: 'pointer'
                            }} class="fa-regular fa-eye-slash" onClick={(() => setType2(!type2))}></i>}

                            <small style={{
                                marginLeft: '15px',
                                fontSize: '11px',
                                marginTop: '0px',
                                color: 'rgba(255, 0, 0, 1)',
                                cursor: 'pointer'
                            }}>{errors?.password_confirmation ? errors?.password_confirmation[0] : confirmPasswordMsg}</small>

                        </div>
                        {(errors.email && errors.email[0] == 'This email address is already registered.') && <small style={{
                            marginLeft: 'auto',
                            fontSize: '11px',
                            color: 'red',
                            fontWeight: '800',

                        }}> Didn't get the link ? <span onClick={(() => {
                            handleModal(0);
                            setResendModal(true)
                        })} style={{
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        }}>Click to resend link</span></small>}
                        <div className='checkbox_wrapper'>
                            <input onChange={handleTermsCondition} name='terms_accepted' type='checkbox' checked={registerFormData.terms_accepted} />
                            <p>By continuing I agree with the <Link to={'/terms-conditions'}>Terms & Conditions</Link>, <Link to={'/privacy-policy'}>Privacy Policy</Link></p>
                        </div>
                        <small style={{
                            marginLeft: '15px',
                            fontSize: '11px',
                            color: 'red'
                        }}>{errors.terms_accepted && errors.terms_accepted[0]}</small>
                        <div onClick={handleSubmit}>
                            <Button children={'Create Account'} styles={{ width: '100%', padding: '17px 0px' }} />
                        </div>
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
                        <div>
                            <Input onChange={handleLoginChange} name={'email'} value={loginFormData.email} type={'text'} label={'Email Address'} required={true} placeholder={'Enter email address'} />
                            <small style={{
                                marginLeft: '15px',
                                fontSize: '11px',
                                marginTop: '-15px',
                                color: 'rgba(255, 0, 0, 1)',
                                cursor: 'pointer'
                            }}>{loginerrors?.email ? loginerrors?.email[0] : emailErrormessage}</small>


                        </div>
                        <div className='input_form' style={{
                            position: 'relative'
                        }}>
                            <label>Password <span>*</span></label>
                            <input onChange={handleLoginChange} name={'password'} value={loginFormData.password} style={{
                                padding: '0 40px 0 15px '
                            }} type={type3 ? 'text' : 'password'} placeholder='*********' />
                            {type3 && <i style={{
                                position: 'absolute',
                                top: '47px',
                                right: '10px',
                                width: '20px',
                                cursor: 'pointer'
                            }} class="fa-regular fa-eye" onClick={(() => setType3(!type3))}></i>}

                            {!type3 && <i style={{
                                position: 'absolute',
                                top: '47px',
                                right: '10px',
                                width: '20px',
                                cursor: 'pointer'
                            }} class="fa-regular fa-eye-slash" onClick={(() => setType3(!type3))}></i>}

                            <small onClick={(() => handleModal(3))} style={{
                                fontSize: '11px',
                                marginLeft: 'auto',
                                color: 'rgba(255, 0, 0, 1)',
                                cursor: 'pointer'
                            }}>Forget Password?</small>

                            {<small style={{
                                fontSize: '12px',
                                marginLeft: 'auto',
                                color: 'rgba(255, 0, 0, 1)',
                                cursor: 'pointer'
                            }} onClick={(() => {
                                handleModal(0);
                                setResendModal(true)
                            })}>Didn't get the link ? <span style={{
                                fontWeight: '700',
                            }}>Resend Link</span></small>}
                        </div>
                        <div onClick={(() => handleSignIn())}>
                            <Button children={'Login'} styles={{ width: '100%', padding: '17px 0px' }} />
                        </div>
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
                        <Input name={'email'} onChange={forgotPasswordHandle} value={email.email} type={'text'} label={'Email Address'} required={true} placeholder={'example@mail.com'} />
                        <small style={{
                            marginLeft: '15px',
                            fontSize: '11px',
                            color: 'red',
                            marginTop: '-10px'
                        }}>{forgotPasswordErrors?.email ? forgotPasswordErrors.email[0] : emailErrormessage}</small>
                        <div onClick={(() => {
                            forGotPasswordSubmit()
                        })}>
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

    useEffect(() => {
        setDropdown(false)
    }, [location.pathname])

    useEffect(() => {
        if (isVerified) {
            setverifiedModal(true)
        } else {
            setverifiedModal(false)
        }
    }, [isVerified])

    const getAllProgramsFunc = async () => {
        try {
            setprogramCategoryLoading(true)
            const res = await getProgramCategory()
            setprogramCategories(res)
        } catch (err) {
            console.log(err)
        } finally {
            setprogramCategoryLoading(false)
        }
    }

    useEffect(() => {
        getAllProgramsFunc()
    }, [])

    return (
        <>
            {(isLoading || forgotPasswordLoading) && <Loaders />}
            {reSendModal && <ResendLinkModal setreSendModal={setResendModal} />}
            {modalToggle.signUp && <Modal children={SignUpmodalData()} handleModal={handleModal} />}
            {modalToggle.signIn && <Modal children={SignInmodalData()} handleModal={handleModal} />}
            {modalToggle.forGotPassword && <Modal children={ForgotPassword()} handleModal={handleModal} />}
            {modalToggle.newPassword && <Modal children={newPassword()} handleModal={handleModal} />}
            {verifiedModal && <VerifiedModal setverifiedModal={setverifiedModal} handleModal={handleModal} />}
            <div className='nav_links_wrapper'>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/about'}>About Us</NavLink>
                <div className={'programs_link'} onClick={(() => setDropdown(!dropdown))}>

                    Programs <img src={down} />
                    {dropdown && <div onClick={((e) => e.stopPropagation())} className='program_dropdown'>
                        {programCategories?.length > 0 && programCategories?.map((e) => (
                            <p onClick={(()=>navigate(`/program/category/${e?.id}`))}>{e?.name}</p>
                        ))}
                    </div>}

                </div>
                <NavLink to={'/articles'}>Articles</NavLink>
                <NavLink to={'/contact'}>Contact Us</NavLink>
                {!isLogin && <div onClick={(() => handleModal(1))}>
                    <Button children={'Login/Sign Up'} />
                </div>}
                {isLogin && <>
                    <div onClick={(() => dispatch(AuthlogOut()))}>
                        <Button children={'Log Out'} />
                    </div>
                </>}
                <i onClick={(() => { setShowNavbar(!showNavbar) })} class="fa-solid fa-bars"></i>
            </div>

            {showNavbar && <ResponsiveNavbar handleModal={handleModal} setShowNavbar={setShowNavbar} />}
        </>
    )
}

export default NavbarLinks
