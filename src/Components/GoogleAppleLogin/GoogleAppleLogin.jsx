import React from 'react'
import './GoogleAppleLogin.css'
import google from '../../assets/Images/Group 36692.svg'
import apple from '../../assets/Images/Group 36692 (1).svg'
const GoogleAppleLogin = () => {
    return (
        <>
            <div className='or_with_wrapper'>
                <p>Or with</p>
                <div className='google_apple_wrapper'>
                    <div className='google_img'>
                        <img src={google} />
                    </div>
                    <div className='google_img'>
                        <img src={apple} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default GoogleAppleLogin
