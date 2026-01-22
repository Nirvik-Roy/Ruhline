import React from 'react'
import { Link } from 'react-router-dom'
import tick from '../../../assets/Images/Layer_1.png'
import { useDispatch } from 'react-redux'
import { Resendmail } from '../../../../Store/Slices/Loginslice/ResendMail'
const VerifyModal = () => {
    const dispatch = useDispatch();
    const resendEmail = () => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            const data = {
                email:userEmail
            }
            dispatch(Resendmail(data))
        }
    }
    return (
        <>
            <div className='payment_succesful_modal_wrapper'></div>
            <div className='payment_succesful_modal'>
                <img src={tick} />
                <h1>Registration Successful</h1>
                <p style={{
                    marginTop: '-15px'
                }}>Plz check your inbox and verify your email</p>
                <p>Don't get the link? <Link onClick={(() => resendEmail())}>Click to resend email</Link></p>
            </div>
        </>
    )
}

export default VerifyModal
