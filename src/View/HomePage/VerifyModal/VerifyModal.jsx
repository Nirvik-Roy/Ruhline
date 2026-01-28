import React from 'react'
import { Link } from 'react-router-dom'
import tick from '../../../assets/Images/Layer_1.png'
const VerifyModal = ({ setverificationModal, setreSendModal }) => {
    return (
        <>
            <div className='payment_succesful_modal_wrapper'></div>
            <div className='payment_succesful_modal'>
                <i class="fa-solid fa-xmark" onClick={(() => setverificationModal(false))} style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px'
                }}></i>
                <img src={tick} />
                <h1>Registration Successful</h1>
                <p style={{
                    marginTop: '-15px'
                }}>Plz check your inbox and verify your email</p>
                <p>Don't get the link? <Link onClick={(() => {
                    setverificationModal(false)
                    setreSendModal(true)
                })}>Click to resend email</Link></p>
            </div>
        </>
    )
}

export default VerifyModal
