import React from 'react'
import { Link } from 'react-router-dom'
import tick from '../../../assets/Images/Layer_1.png'
const AutoVerifyModal = () => {
    return (
        <>
            <div className='payment_succesful_modal_wrapper'></div>
            <div className='payment_succesful_modal'>
                <img src={tick} />
                <h1>We are verifying your mail</h1>
                <p style={{
                    marginTop: '-15px'
                }}>Plz be patient...</p>
                {/* <p>Don't get the link? <Link>Click to resend email</Link></p> */}
            </div>
        </>
    )
}

export default AutoVerifyModal
