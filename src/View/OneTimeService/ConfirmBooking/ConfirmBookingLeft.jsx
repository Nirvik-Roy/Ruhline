import React, { useEffect, useState } from 'react'
import img from '../../../assets/Images/Frame 20.png'
import Input from '../../../Components/Inputs/Input'
import DeleteProgramModal from './DeleteProgramModal';
import { replace, useNavigate, useParams } from 'react-router-dom';
const ConfirmBookingLeft = ({ paymentDetails, userData, singleProgramData, phoneCountryCode }) => {
  const [paymentDropdown, setPaymentDropdown] = useState(true);
  const navigate = useNavigate();
  const {id} = useParams()
  const [deleteModal,setdeleteModal] = useState(false)
  const [formData, setformData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    phone_country_code: ''
  })
  useEffect(() => {
    setformData({
      first_name: userData?.first_name || '',
      last_name: userData?.last_name || '',
      email: userData?.email || '',
      phone: userData?.profile?.phone || '',
      phone_country_code: userData?.profile?.phone_country_code?.id || ''
    })
  }, [userData])

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setformData({
      ...formData,
      [name]:value
    })
  }
  
  return (
    <>
      <DeleteProgramModal onDelete={(() => navigate(`/single-program/${id}`))} onClose={(()=>setdeleteModal(false))} isOpen={deleteModal}/>
      <div className='confirm_left_wrapper'>
        <div className='booking_details_wrapper4896'>
          <div className='booking_image_wrapper7893'>
            <img src={img} />
            <div>
              <h4>{singleProgramData?.name}</h4>
              <h1><del>{paymentDetails?.currency}{singleProgramData?.original_price}</del> {paymentDetails?.currency}{singleProgramData?.sale_price}</h1>
            </div>
          </div>
          <i onClick={(()=>setdeleteModal(true))} class="fa-regular fa-trash-can"></i>
        </div>

        <h3>Basic Details</h3>

        <form className='confirm_form_wrapper'>
          <div className='cofirm_form_grid_wrapper'>
            <Input onChange={handleChange} name={'first_name'} label={'First Name'} value={formData?.first_name} type={'text'} required={true} />
            <Input label={'Last Name'} onChange={handleChange} name={'last_name'} defaultValue={formData?.last_name} type={'text'} required={true} placeholder={'Bhowmick'} />
            <Input readOnly={true} label={'Email'} defaultValue={formData?.email} type={'email'} required={true} placeholder={'bidishab@gmail.com'} />
            <div className='input_form confirm_input_form'>
              <label>Phone <span>*</span></label>
              <div className='phone_input_Wrapper656'>
                <select onChange={handleChange} name='phone_country_code' value={formData?.phone_country_code}>
                  {phoneCountryCode?.map((e) => (
                    <option value={e.id}>+{e.phone_code}</option>
                  ))}
                </select>
                <input onChange={handleChange} value={formData?.phone} name='phone' placeholder='Enter your phone number' />
              </div>
            </div>
          </div>


          {/* <div className='payment_dropdown_div56600'>
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

          </div> */}
        </form>
      </div>
    </>
  )
}

export default ConfirmBookingLeft
