import React, { useState } from 'react'
import img from '../../../assets/Images/Frame 20.png'
import Input from '../../../Components/Inputs/Input'
import arrow from '../../../assets/Images/Vector75.svg'
import countryData from '../../../../countries.json'
const ConfirmBookingLeft = () => {
  const [paymentDropdown, setPaymentDropdown] = useState(true)
  return (
    <>
      <div className='confirm_left_wrapper'>
        <div className='booking_details_wrapper4896'>
          <div className='booking_image_wrapper7893'>
            <img src={img} />
            <div>
              <h4>Lorem ipsum dolor sit amet</h4>
              <h1><del>SAR97</del> SAR67</h1>
            </div>
          </div>
          <i class="fa-regular fa-trash-can"></i>
        </div>

        <h3>Basic Details</h3>

        <form className='confirm_form_wrapper'>
          <div className='cofirm_form_grid_wrapper'>
            <Input label={'First Name'} type={'text'} required={true} placeholder={'Bidisha'} />
            <Input label={'Last Name'} type={'text'} required={true} placeholder={'Bhowmick'} />
            <Input label={'Email'} type={'email'} required={true} placeholder={'bidishab@gmail.com'} />
            <div className='input_form confirm_input_form'>
              <label>Phone <span>*</span></label>
              <div className='phone_input_Wrapper656'>
                <select>
                  {countryData.map((e, i) => (
                    <option key={e.code}>{e.code}</option>
                  ))}

                </select>
                <input placeholder='1234567890'/>
              </div>

            </div>
          </div>


          <div className='payment_dropdown_div56600'>
            <div className='payment_head_wrapper_4566778'>
              <h3>Payment Method</h3>
              <svg onClick={(() => setPaymentDropdown(!paymentDropdown))} className={paymentDropdown ? '' : 'transform_svg'} xmlns="http://www.w3.org/2000/svg" width="18" height="9" viewBox="0 0 18 9" fill="none">
                <path d="M16.59 7.84766L10.07 1.32766C9.3 0.557656 8.04 0.557656 7.27 1.32766L0.75 7.84766" stroke="#462307" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            {paymentDropdown && <div className='cofirm_form_grid_wrapper'>
              <Input label={'Card holder name'} type={'text'} required={true} placeholder={'Bidisha Bhowmick'} />
              <Input label={'Card number'} type={'text'} required={true} placeholder={'1233 4567 7897 7897'} />
              <Input label={'Expire date'} type={'date'} required={true} />
              <Input label={'CVC'} required={true} placeholder={'***'} />
            </div>}

          </div>
        </form>
      </div>
    </>
  )
}

export default ConfirmBookingLeft
