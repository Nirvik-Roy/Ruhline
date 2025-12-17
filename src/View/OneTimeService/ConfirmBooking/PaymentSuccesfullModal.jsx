import React from 'react'
import { Link } from 'react-router-dom'
import tick from '../../../assets/Images/Layer_1.png'
const PaymentSuccesfullModal = ({setModal}) => {
  return (
    <>
      <div className='payment_succesful_modal_wrapper' onClick={(()=>setModal(false))}></div>
      <div className='payment_succesful_modal'>
        <img src={tick}/>
        <h1>Payment Successful</h1>
        <p>You're all set!</p>
        <p style={{
            marginTop:'-15px'
        }}>Redirecting to your dashboard</p>
        <p>If not redirected, <Link>Click to view Dashboard</Link></p>
      </div>
    </>
  )
}

export default PaymentSuccesfullModal
