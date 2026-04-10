import React, { useEffect, useState } from 'react'
import BannerLayout from '../../BannerLayout/BannerLayout'
import '../OneTimeProgram.css'
import ConfirmBookingLeft from './ConfirmBookingLeft'
import ConfirmBookingRight from './ConfirmBookingRight'
import { getUserProfile } from '../../../utils/user'
import { getSingleProgram } from '../../../utils/program'
import { useParams, useSearchParams } from 'react-router-dom'
import Loaders from '../../../Components/Loaders/Loaders'
import { getPhoneCountryCode } from '../../../utils/location'
import { initatePayment } from '../../../utils/payments'
import PaymentInitiateModal from './PaymentInitiateModal'
import PaymentSuccesfullModal from './PaymentSuccesfullModal.jsx'
import PaymentFailedModal from './PaymentFailedModal.jsx'
const ConfirmBooking = () => {
  const [paymentDetails, setpaymentDetails] = useState({})
  const { id, coachId } = useParams()
  const [userData, setuserData] = useState({})
  const [singleProgramData, setsingleProgramData] = useState({})
  const [loading, setloading] = useState(false)
  const [phoneCountryCode, setphoneCountryCode] = useState()
  const [paymentLoading, setpaymentLoading] = useState(false)
  const [success, setsucces] = useState(null)
  const [searchParams] = useSearchParams();
  const slot = searchParams.get("slot");
  const original = atob(decodeURIComponent(slot));
  useEffect(() => {
    const status = searchParams.get('status')
    if(status){
      if (status == 'success') {
        setsucces(true)
      } else {
        setsucces(false)
      }
    }
  }, [])
  const getUser = async () => {
    setloading(true)
    const res = await getUserProfile()
    setuserData(res?.user)
    setloading(false)
  }

  const getProgram = async () => {
    setloading(true)
    const res = await getSingleProgram(id)
    setsingleProgramData(res)
    setloading(false)
  }

  const getPhoneCodes = async () => {
    setloading(true)
    const res = await getPhoneCountryCode();
    setphoneCountryCode(res)
    setloading(false)
  }

  useEffect(() => {
    getUser()
    getProgram()
    getPhoneCodes()
  }, [id])

  useEffect(() => {
    const data = localStorage.getItem('previewData')
    if (data) {
      setpaymentDetails(JSON.parse(data))
    }
  }, [])
  const paymentFunc = async () => {
    try {
      setpaymentLoading(true);
      setsucces(null)
      const encodedSlot = encodeURIComponent(slot);
      const res = await initatePayment({
        program_id: id,
        coach_id: coachId,
        slot_start_at: original,
        success_url: `https://ruhline.vercel.app/confirm-booking/${id}/${coachId}/?slot=${encodedSlot}&status=success`,
        cancel_url: `https://ruhline.vercel.app/confirm-booking/${id}/${coachId}?status=cancel`
      });
      if (res?.success) {
        window.location.href = `${res?.data?.checkout_url}`
      }
    } catch (err) {
      console.log(err);
    } finally {
      setpaymentLoading(false);
    }
  };

  return (
    <>
      <BannerLayout title={'Confirm Booking'} />
      <PaymentInitiateModal isOpen={paymentLoading} />
      <PaymentFailedModal onTryAgain={(() => paymentFunc())} onClose={(()=>setsucces(null))} isOpen={success == false} />
      {success && <PaymentSuccesfullModal />}
      {loading && <Loaders />}
      <div className='confirm_booking_wrapper'>
        <div className='all_Container confirm_booking_content_wrapper'>
          <ConfirmBookingLeft phoneCountryCode={phoneCountryCode} singleProgramData={singleProgramData} userData={userData} paymentDetails={paymentDetails} />
          <ConfirmBookingRight paymentFunc={paymentFunc} paymentDetails={paymentDetails} />
        </div>
      </div>
    </>
  )
}

export default ConfirmBooking
