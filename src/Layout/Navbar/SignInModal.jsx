import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Auth } from '../../../Store/Slices/Loginslice/AuthSlice'
import { closeGlobalLogin } from '../../../Store/Slices/Loginslice/GlobalLoginSlice'
import Button from '../../Components/Button/Button.jsx'
import Input from '../../Components/Inputs/Input'
import GoogleAppleLogin from '../../Components/GoogleAppleLogin/GoogleAppleLogin.jsx'
import toast from 'react-hot-toast'

const SignInModal = ({ handleModal, setResendModal }) => {
    const dispatch = useDispatch()
    const { loginerrors, isLoading } = useSelector(state => state.auth)

    const [loginFormData, setloginFormdata] = useState({ email: '', password: '' })
    const [type3, setType3] = useState(false)

    const handleLoginChange = (e) => {
        const { name, value } = e.target
        setloginFormdata(prev => ({ ...prev, [name]: value }))
    }

    const handleSignIn = async(e) => {
        e.preventDefault()
        if (loginFormData.email && loginFormData.password) {
            try{
                await dispatch(Auth(loginFormData)).unwrap()
                dispatch(closeGlobalLogin())
                handleModal(0)
            }catch(err){
                console.log('Login failed...',err)
            }
        }else{
            toast.error('Plz fill the required fileds')
        }
    }

    return (
        <div className='sign_up_wrapper sign_in_wrapper'>
            <h3>Log in</h3>
            <p>
                Don't have an account yet?{' '}
                <span onClick={() => { dispatch(closeGlobalLogin()); handleModal(1) }}>
                    Sign up
                </span>{' '}
                for free
            </p>

            <form className='modal_form'>
                <div>
                    <Input onChange={handleLoginChange} name='email' value={loginFormData.email}
                        type='text' label='Email Address' required={true} placeholder='Enter email address' />
                    <small style={{ marginLeft: '15px', fontSize: '11px', marginTop: '-15px', color: 'rgba(255,0,0,1)', cursor: 'pointer' }}>
                        {loginerrors?.email?.[0]}
                    </small>
                </div>

                <div className='input_form' style={{ position: 'relative' }}>
                    <label>Password <span>*</span></label>
                    <input onChange={handleLoginChange} name='password' value={loginFormData.password}
                        style={{ padding: '0 40px 0 15px' }} type={type3 ? 'text' : 'password'} placeholder='*********' />
                    <i style={{ position: 'absolute', top: '47px', right: '10px', width: '20px', cursor: 'pointer' }}
                        className={`fa-regular ${type3 ? 'fa-eye' : 'fa-eye-slash'}`}
                        onClick={() => setType3(!type3)} />
                    <small onClick={() => { dispatch(closeGlobalLogin()); handleModal(3) }}
                        style={{ fontSize: '11px', marginLeft: 'auto', color: 'rgba(255,0,0,1)', cursor: 'pointer' }}>
                        Forget Password?
                    </small>
                    <small style={{ fontSize: '12px', marginLeft: 'auto', color: 'rgba(255,0,0,1)', cursor: 'pointer' }}
                        onClick={() => { handleModal(0); dispatch(closeGlobalLogin()); setResendModal(true) }}>
                        Didn't get the link?{' '}
                        <span style={{ fontWeight: '700' }}>Resend Link</span>
                    </small>
                </div>

                <div onClick={handleSignIn}>
                    <Button loading={isLoading} loadingText='Login you in...' children='Login' styles={{ width: '100%', minWidth:'100%', padding: '17px 0px' }} />
                </div>
                <GoogleAppleLogin />
            </form>
        </div>
    )
}

export default SignInModal