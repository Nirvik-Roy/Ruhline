import React from 'react'
import { Link } from 'react-router-dom'
import tick from '../../../assets/Images/Layer_1.png'
const VerifiedModal = ({ handleModal, setverifiedModal }) => {
    return (
        <>
            <div className='payment_succesful_modal_wrapper'></div>
            <div className='payment_succesful_modal'>
                <i onClick={(() => setverifiedModal(false))} style={{
                    position: 'absolute',
                    top: '15px',
                    right: '10px',
                    cursor: 'pointer'
                }} class="fa-solid fa-xmark"></i>
                <img src={tick} />
                <h1>Email Verified Succes</h1>
                <p style={{
                    marginTop: '-15px'
                }}>You can now procced to login</p>
                <p><Link onClick={(() => {
                    setverifiedModal(false)
                    handleModal(2)
                })}>Click to login</Link></p>
            </div>
        </>
    )
}

export default VerifiedModal
