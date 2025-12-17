import React from 'react'
import BannerLayout from '../../BannerLayout/BannerLayout'
import '../OneTimeProgram.css'
import ConfirmBookingLeft from './ConfirmBookingLeft'
import ConfirmBookingRight from './ConfirmBookingRight'
const ConfirmBooking = () => {
  return (
    <>
      <BannerLayout title={'Confirm Booking'}/>
      <div className='confirm_booking_wrapper'>
        <div className='all_Container confirm_booking_content_wrapper'>
            <ConfirmBookingLeft/>
            <ConfirmBookingRight/>
        </div>
      </div>
    </>
  )
}

export default ConfirmBooking
