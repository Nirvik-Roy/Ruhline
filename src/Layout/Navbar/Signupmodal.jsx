import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Authregister } from '../../../Store/Slices/Loginslice/RegisterSlice'
import Button from '../../Components/Button/Button'
import Input from '../../Components/Inputs/Input'
import GoogleAppleLogin from '../../Components/GoogleAppleLogin/GoogleAppleLogin.jsx'

const SignUpModal = ({ handleModal, setResendModal }) => {
    const dispatch = useDispatch()
    const { errors } = useSelector(state => state.auth)

    const [registerFormData, setregisterFormData] = useState({
        first_name: '', last_name: '', email: '',
        password: '', password_confirmation: '', terms_accepted: false
    })
    const [passwordMsg, setPasswordMsg] = useState('')
    const [confirmPasswordMsg, setConfirmPasswordMsg] = useState('')
    const [type, setType] = useState(false)
    const [type2, setType2] = useState(false)

    const validatePasswordMsg = (password) => {
        if (!password) return ''
        if (password.length < 8) return 'Password must be at least 8 characters'
        return ''
    }

    const validateConfirmPasswordMsg = (password, confirmPassword) => {
        if (!confirmPassword) return ''
        if (password !== confirmPassword) return 'Password and Confirm Password should be same'
        return ''
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'password') {
            setPasswordMsg(validatePasswordMsg(value))
            setConfirmPasswordMsg(validateConfirmPasswordMsg(value, registerFormData.password_confirmation))
        }
        if (name === 'password_confirmation') {
            setConfirmPasswordMsg(validateConfirmPasswordMsg(registerFormData.password, value))
        }
        setregisterFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleTermsCondition = () => {
        setregisterFormData(prev => ({ ...prev, terms_accepted: !prev.terms_accepted }))
    }

    const handleSubmit = () => {
        dispatch(Authregister(registerFormData))
    }

    return (
        <div className='sign_up_wrapper'>
            <h3>Sign Up</h3>
            <p>
                Already have an account?{' '}
                <span onClick={() => handleModal(2)}>Log In</span>
            </p>

            <form className='modal_form'>
                <div className='modal_form_grid_wrapper'>
                    <div>
                        <Input value={registerFormData.first_name} name='first_name' onChange={handleChange} type='text' label='First Name' required={true} placeholder='Enter first name' />
                        <small style={{ marginLeft: '15px', fontSize: '11px', color: 'red' }}>
                            {errors.first_name?.[0]}
                        </small>
                    </div>
                    <div>
                        <Input value={registerFormData.last_name} name='last_name' onChange={handleChange} type='text' label='Last Name' required={true} placeholder='Enter last name' />
                        <small style={{ marginLeft: '15px', fontSize: '11px', color: 'red' }}>
                            {errors.last_name?.[0]}
                        </small>
                    </div>
                </div>

                <div>
                    <Input value={registerFormData.email} name='email' onChange={handleChange} type='text' label='Email Address' required={true} placeholder='Enter email address' />
                    <small style={{ marginLeft: '15px', fontSize: '11px', color: 'red' }}>
                        {errors.email?.[0]}
                    </small>
                </div>

                <div className='input_form' style={{ position: 'relative' }}>
                    <label>Password <span>*</span></label>
                    <input value={registerFormData.password} name='password' onChange={handleChange}
                        style={{ padding: '0 40px 0 15px' }} type={type ? 'text' : 'password'} placeholder='*********' />
                    <i style={{ position: 'absolute', top: '47px', right: '10px', width: '20px', cursor: 'pointer' }}
                        className={`fa-regular ${type ? 'fa-eye' : 'fa-eye-slash'}`}
                        onClick={() => setType(!type)} />
                    <small style={{ marginLeft: '15px', fontSize: '11px', color: 'rgba(255,0,0,1)' }}>
                        {errors?.password?.[0] || passwordMsg}
                    </small>
                </div>

                <div className='input_form' style={{ position: 'relative' }}>
                    <label>Confirm Password <span>*</span></label>
                    <input value={registerFormData.password_confirmation} name='password_confirmation' onChange={handleChange}
                        style={{ padding: '0 40px 0 15px' }} type={type2 ? 'text' : 'password'} placeholder='*********' />
                    <i style={{ position: 'absolute', top: '47px', right: '10px', width: '20px', cursor: 'pointer' }}
                        className={`fa-regular ${type2 ? 'fa-eye' : 'fa-eye-slash'}`}
                        onClick={() => setType2(!type2)} />
                    <small style={{ marginLeft: '15px', fontSize: '11px', color: 'rgba(255,0,0,1)' }}>
                        {errors?.password_confirmation?.[0] || confirmPasswordMsg}
                    </small>
                </div>

                {errors.email?.[0] === 'This email address is already registered.' && (
                    <small style={{ marginLeft: 'auto', fontSize: '11px', color: 'red', fontWeight: '800' }}>
                        Didn't get the link?{' '}
                        <span onClick={() => { handleModal(0); setResendModal(true) }}
                            style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                            Click to resend link
                        </span>
                    </small>
                )}

                <div className='checkbox_wrapper'>
                    <input onChange={handleTermsCondition} name='terms_accepted' type='checkbox' checked={registerFormData.terms_accepted} />
                    <p>
                        By continuing I agree with the{' '}
                        <Link to='/terms-conditions'>Terms & Conditions</Link>,{' '}
                        <Link to='/privacy-policy'>Privacy Policy</Link>
                    </p>
                </div>
                <small style={{ marginLeft: '15px', fontSize: '11px', color: 'red' }}>
                    {errors.terms_accepted?.[0]}
                </small>

                <div onClick={handleSubmit}>
                    <Button children='Create Account' styles={{ width: '100%', padding: '17px 0px' }} />
                </div>
                <GoogleAppleLogin />
            </form>
        </div>
    )
}

export default SignUpModal