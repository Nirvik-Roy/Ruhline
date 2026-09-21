import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../../Components/Button/Button.jsx'
import toast from 'react-hot-toast'
import { postPreview } from '../../../utils/payments'

const ConfirmBookingRight = ({ paymentDetails, setpaymentDetails, paymentFunc }) => {
  const { id, coachId } = useParams()
  const [couponCode, setCouponCode] = useState('')
  const [applying, setApplying] = useState(false)
  const [removing, setRemoving] = useState(false)

  const stored = JSON.parse(localStorage.getItem('previewData') || '{}')
  console.log(stored)
  const appliedCoupon =
    paymentDetails?.coupon_code

  const discountAmount =
    paymentDetails?.discount_amount

  const hasDiscount = Number(discountAmount) > 0 || Boolean(appliedCoupon)

  const applyCoupon = async () => {
    const code = couponCode.trim()
    if (!code) {
      toast.error('Please enter a coupon code...')
      return
    }

    try {
      setApplying(true)
      const res = await postPreview({
        program_id: stored?.program_id || id,
        coach_id: stored?.coach_id || coachId,
        slot_start_at: stored?.slot_start_at_utc,
        coupon_code: code,
      })
      if (res?.success) {
        const updated = { ...res.data, coupon_code: code }
        localStorage.setItem('previewData', JSON.stringify(updated))
        setpaymentDetails(updated)
        toast.success('Coupon applied successfully')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setApplying(false)
    }
  }

  const removeCoupon = async () => {
    try {
      setRemoving(true)
      const res = await postPreview({
        program_id: stored?.program_id || id,
        coach_id: stored?.coach_id || coachId,
        slot_start_at: stored?.slot_start_at_utc,
        coupon_code: null,
      })
      if (res?.success) {
        const updated = { ...res.data, coupon_code: null }
        localStorage.setItem('previewData', JSON.stringify(updated))
        setpaymentDetails(updated)
        setCouponCode('')
        toast.success('Coupon removed')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setRemoving(false)
    }
  }

  return (
    <>
      <div className='confirm_right_wrapper'>
        <h3>Coupon</h3>
        <div className='coupon_input_wrapper_45 input_form'>
          <input
            placeholder='Have a code? type it here...'
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            disabled={applying}
          />
          <span onClick={applying ? undefined : applyCoupon}>
            {applying ? 'Applying...' : 'Apply'}
          </span>
        </div>
        <div className='order_summary_wrapper562'>
          <h3>Order Summary</h3>
          <div className='order_program_wrapper'>
            <h5>Program Price</h5>
            <h5>{paymentDetails?.currency}{paymentDetails?.subtotal_amount}</h5>
          </div>
          {hasDiscount && (
            <div className='order_program_wrapper'>
              <h5>Coupon Discount</h5>
              <h5 className='coupon_discount_value'>
                -{paymentDetails?.currency}{discountAmount}
              </h5>
            </div>
          )}
        </div>
        <div className='total_wrapper_462'>
          <div className='total_head_Wrapper'>
            <h2>Total</h2>
            <h1>{paymentDetails?.currency}{paymentDetails?.total_amount}</h1>
          </div>
          {appliedCoupon && (
            <div className='coupon_applied_badge'>
              <span>Coupon applied</span>
              <strong>{appliedCoupon}</strong>
              <button
                type='button'
                className='coupon_remove_btn'
                onClick={applying ? undefined : removeCoupon}
                disabled={applying}
              >
                {removing ? 'Removing...' : 'Remove'}
              </button>
              {Number(discountAmount) > 0 && (
                <em>You saved {paymentDetails?.currency}{discountAmount}</em>
              )}
            </div>
          )}
          <p>By placing this order, you are agreeing to Terms and Conditions.</p>
          <div>
            <Button onClick={() => paymentFunc()} children={'Proceed'} styles={{ width: '100%' }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmBookingRight
