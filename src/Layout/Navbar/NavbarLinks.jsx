import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../Components/Button/Button'
import down from '../../assets/Images/arrow-right.svg'
import Modal from '../../Components/Modal/Modal'
import ResponsiveNavbar from './ResponsiveNavbar'
import Loaders from '../../Components/Loaders/Loaders.jsx'
import ResendLinkModal from '../../View/ResendLinkModal/ResendLinkModal.jsx'
import VerifyModal from '../../View/HomePage/VerifyModal/VerifyModal.jsx'
import AutoVerifyModal from '../../View/HomePage/VerifyModal/AutoVerifyModal.jsx'
import VerifiedModal from '../../View/HomePage/VerifyModal/VerifiedModal.jsx'
import { AuthlogOut, verifyToken } from '../../../Store/Slices/Loginslice/AuthSlice.js'
import { Autoverify } from '../../../Store/Slices/Loginslice/AutoVerfiySlice.js'
import { getProgramCategory } from '../../utils/program'

import SignUpModal from './Signupmodal.jsx'
import SignInModal from './SignInModal.jsx'
import ForgotPasswordModal from './Forgotpasswordmodal.jsx'
import NewPasswordModal from './Newpasswordmodal.jsx'

const NavbarLinks = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const { isVerified, isLogin, isLoading, isRegistration, isVerifyChecking } = useSelector(state => state.auth)
    const { isLoginModal } = useSelector(state => state.globalLogin)

    const [modalToggle, setmodalToggle] = useState({ signUp: false, signIn: false, forGotPassword: false, newPassword: false })
    const [verificationModal, setverificationModal] = useState(false)
    const [verifiedModal, setverifiedModal] = useState(false)
    const [reSendModal, setResendModal] = useState(false)
    const [showNavbar, setShowNavbar] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [programCategories, setprogramCategories] = useState()
    const [loading,setloading] = useState(false)
    const handleModal = (i) => {
        setmodalToggle({
            signUp: i === 1,
            signIn: i === 2,
            forGotPassword: i === 3,
            newPassword: i === 4,
        })
    }

    useEffect(() => { dispatch(verifyToken()) }, [dispatch])

    useEffect(() => {
        const getAllPrograms = async () => {
            try {
                const res = await getProgramCategory()
                setprogramCategories(res)
            } catch (err) {
                console.log(err)
            }
        }
        getAllPrograms()
    }, [])

    useEffect(() => {
        if (isRegistration) {
            setverificationModal(true);
            handleModal(0)
        }
    }, [isRegistration])

    useEffect(() => {
        if (isLogin) handleModal(0)
    }, [isLogin])

    useEffect(() => {
        setverifiedModal(!!isVerified)
    }, [isVerified])

    useEffect(() => {
        setDropdown(false)
        handleModal(0)
    }, [location.pathname])

    useEffect(() => {
        if (!location.pathname.startsWith('/verify-email')) return
        const params = new URLSearchParams(location.search)
        const id = params.get('id')
        const hash = params.get('hash')
        const expires = params.get('expires')
        const signature = params.get('signature')
        if (id && hash && expires && signature) {
            dispatch(Autoverify({ id, hash, expires, signature }))
        }
    }, [location, dispatch])

    return (
        <>
            {(loading) && <Loaders />}

            {reSendModal && <ResendLinkModal setResendModal={setResendModal} />}

            {modalToggle.signUp && (
                <Modal handleModal={handleModal}>
                    <SignUpModal handleModal={handleModal} setResendModal={setResendModal} />
                </Modal>
            )}

            {(modalToggle.signIn || isLoginModal) && (
                <Modal closeGlobalLoginflag={true} handleModal={handleModal}>
                    <SignInModal handleModal={handleModal} setResendModal={setResendModal} />
                </Modal>
            )}

            {modalToggle.forGotPassword && (
                <Modal handleModal={handleModal}>
                    <ForgotPasswordModal setloading={setloading}  handleModal={handleModal} />
                </Modal>
            )}

            {modalToggle.newPassword && (
                <Modal handleModal={handleModal}>
                    <NewPasswordModal />
                </Modal>
            )}

            {verificationModal && <VerifyModal setResendModal={setResendModal} setverificationModal={setverificationModal} />}
            {(isVerifyChecking && !isVerified) && <AutoVerifyModal />}
            {verifiedModal && <VerifiedModal setverifiedModal={setverifiedModal} handleModal={handleModal} />}

            <div className='nav_links_wrapper'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/about'>About Us</NavLink>

                <div className='programs_link' onClick={() => setDropdown(!dropdown)}>
                    Programs <img src={down} alt='' />
                    {dropdown && (
                        <div onClick={(e) => e.stopPropagation()} className='program_dropdown'>
                            {programCategories?.length <= 0 && (
                                <p style={{ fontSize: '12px' }}>No program available</p>
                            )}
                            {programCategories?.map((e) => (
                                <p key={e.id} onClick={() => navigate(`/program/category/${e.id}`)}>{e.name}</p>
                            ))}
                        </div>
                    )}
                </div>

                <NavLink to='/articles'>Articles</NavLink>
                <NavLink to='/contact'>Contact Us</NavLink>

                {!isLogin && (
                    <div onClick={() => handleModal(1)}>
                        <Button children='Login/Sign Up' />
                    </div>
                )}

                {isLogin && (
                    <i style={{ color: 'var(--primary-color)', fontSize: '20px', border: '1px solid var(--primary-color)', width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' }}
                        onClick={() => navigate('/dashboard/profile')}
                        className='fa-solid fa-user' />
                )}

                {isLogin && (
                    <div onClick={() => dispatch(AuthlogOut())}>
                        <Button children='Log Out' />
                    </div>
                )}

                <i onClick={() => setShowNavbar(!showNavbar)} className='fa-solid fa-bars' />
            </div>

            {showNavbar && <ResponsiveNavbar handleModal={handleModal} setShowNavbar={setShowNavbar} />}
        </>
    )
}

export default NavbarLinks