import React, { useState } from 'react'
import Input from '../../Components/Inputs/Input'
import Button from '../../Components/Button/Button'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Resendmail } from '../../../Store/Slices/Loginslice/ResendMail'
import Loaders from '../../Components/Loaders/Loaders'
const ResendLinkModal = ({ setResendModal }) => {
    const [isLoading, setisLoading] = useState(false);
    const { isResend, resendErrors, resendLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [emailErrormessage, setEmailerrorMessage] = useState('');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const ValidateEmail = (email) => {
        if (!email) {
            return setEmailerrorMessage('* Email is Required')
        }
        if (!emailRegex.test(email)) {
            return setEmailerrorMessage('* Please Enter a vaild email address')
        }
        return setEmailerrorMessage('');
    }
    const [email, setEmail] = useState({
        email: ''
    })
    const reSendLink = async () => {
        if (email.email != '') {
            setisLoading(true)
            try {
                await dispatch(Resendmail(email))
            } catch (err) {
                console.log(err)
            } finally {
                setisLoading(false)
            }
        } else {
            toast.error("plz fill the required filed..")
            setisLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        // if(name === 'email'){
        //     ValidateEmail(email)
        // }
        setEmail({
            [name]: value
        })
    }
    return (
        <>
            {isLoading && <Loaders />}
            <div className='modal_wrapper_overlay'></div>
            <div className='modal_wrapper_div'>
                <i class="fa-solid fa-xmark" onClick={(() => setResendModal(false))} style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px'
                }}></i>
                <div className='sign_up_wrapper' style={{
                    height: 'fit-content'
                }}>
                    <h3>Didn't recieve the link?</h3>
                    <p>Please enter your email address. You will receive a link in your email
                    </p>

                    <form className='modal_form'>
                        <Input onCh name={'email'} onChange={handleChange} value={email.email} type={'text'} label={'Email Address'} required={true} placeholder={'example@mail.com'} />
                        <small style={{
                            marginLeft: '15px',
                            fontSize: '11px',
                            color: 'red',
                            marginTop: '-10px'
                        }}>{resendErrors?.email ? resendErrors.email[0] : emailErrormessage}</small>
                        <div onClick={(() => {
                            reSendLink()
                        })}>
                            <Button children={'Send Link'} styles={{ width: '100%', padding: '17px 0px' }} />
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default ResendLinkModal
