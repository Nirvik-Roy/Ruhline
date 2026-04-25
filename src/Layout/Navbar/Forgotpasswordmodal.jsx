import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { userForgetPassword } from '../../utils/user'
import Button from '../../Components/Button/Button'
import Input from '../../Components/Inputs/Input'
import Loaders from '../../Components/Loaders/Loaders'

const ForgotPasswordModal = ({ handleModal }) => {
    const [email, setEmail] = useState({ email: '' })
    const [forgotPasswordErrors, setforgotPasswordErrors] = useState()
    const [loading, setloading] = useState(false)
    const forgotPasswordHandle = (e) => {
        const { name, value } = e.target
        setEmail(prev => ({ ...prev, [name]: value }))
    }

    const forGotPasswordSubmit = async () => {
        if (!email.email) {
            toast.error('plz fill the required filed..')
            return
        }
        try {
            setloading(true)
            const result = await userForgetPassword(email)
            setforgotPasswordErrors(result)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    return (
        <>            <div className='sign_up_wrapper' style={{ height: 'fit-content' }}>
            <h3>Lost your password?</h3>
            <p>
                Please enter your username or email address. You will receive a link to
                create a new password via email. Remember now?{' '}
                <span onClick={() => handleModal(2)}>Back to login</span>
            </p>

            <form onSubmit={((e) => e.preventDefault())} className='modal_form'>
                <Input name='email' onChange={forgotPasswordHandle} value={email.email}
                    type='text' label='Email Address' required={true} placeholder='example@mail.com' />
                <small style={{ marginLeft: '15px', fontSize: '11px', color: 'red', marginTop: '-10px' }}>
                    {forgotPasswordErrors?.email?.[0]}
                </small>

                <div onClick={forGotPasswordSubmit}>
                    <Button loadingText='Sending link...' loading={loading} children='Send Link' styles={{ width: '100%', padding: '17px 0px' }} />
                </div>
            </form>
        </div>
        </>
    )
}

export default ForgotPasswordModal