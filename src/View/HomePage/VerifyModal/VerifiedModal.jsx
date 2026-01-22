import React from 'react'
import { Link } from 'react-router-dom'
import tick from '../../../assets/Images/Layer_1.png'
const VerifiedModal = ({handleModal,setverifiedModal}) => {
    return (
        <>
            <div className='payment_succesful_modal_wrapper' onClick={(()=>setverifiedModal(false))}></div>
            <div className='payment_succesful_modal'>
                <img src={tick} />
                <h1>Email Verified Succes</h1>
                <p style={{
                    marginTop: '-15px'
                }}>Plz check your inbox and verify your email</p>
                <p><Link onClick={(()=>{handleModal(2)})}>Click to login</Link></p>
            </div>
        </>
    )
}

export default VerifiedModal
