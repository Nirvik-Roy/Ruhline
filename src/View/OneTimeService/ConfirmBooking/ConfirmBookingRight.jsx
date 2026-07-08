import Button from '../../../Components/Button/Button.jsx'
import toast from 'react-hot-toast'
const ConfirmBookingRight = ({ paymentDetails, paymentFunc }) => {
  return (
    <>
      <div className='confirm_right_wrapper'>
        <h3>Coupon</h3>
        <div className='coupon_input_wrapper_45 input_form'>
          <input placeholder='Have a code? type it here...' />
          <span onClick={(() => {
            toast.error('This feature is not available at this moment...')
          })}>Apply</span>
        </div>
        <div className='order_summary_wrapper562'>
          <h3>Order Summary</h3>
          <div className='order_program_wrapper'>
            <h5>Program Price</h5>
            <h5>{paymentDetails?.currency}{paymentDetails?.subtotal_amount}</h5>
          </div>
          {paymentDetails?.cupon && <div className='order_program_wrapper'>
            <h5>Coupon Discount</h5>
            <h5>-SAR4.78</h5>
          </div>}
        </div>
        <div className='total_wrapper_462'>
          <div className='total_head_Wrapper'>
            <h2>Total</h2>
            <h1>{paymentDetails?.currency}{paymentDetails?.total_amount}</h1>
          </div>
          <p>By placing this order, you are agreeing to Terms and Conditions.</p>
          <div>
            <Button onClick={(()=>paymentFunc())} children={'Proceed'} styles={{ width: '100%' }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmBookingRight
