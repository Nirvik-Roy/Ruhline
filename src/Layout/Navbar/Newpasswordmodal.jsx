import React, { useState } from 'react'
import Button from '../../Components/Button/Button'
import eye from '../../assets/Images/Union (3).png'
import tick from '../../assets/Images/Union (4).png'

const NewPasswordModal = () => {
    const [formData, setFormData] = useState({ password: '', confirmPassword: '' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className='sign_up_wrapper' style={{ height: 'fit-content' }}>
            <h3>Create a new password</h3>
            <form className='modal_form'>
                <div className='input_form' style={{ position: 'relative' }}>
                    <label>Password <span>*</span></label>
                    <input name='password' value={formData.password} onChange={handleChange}
                        style={{ padding: '0 40px 0 15px' }} type='password' placeholder='*********' />
                    <img style={{ position: 'absolute', top: '47px', right: '10px', width: '20px', cursor: 'pointer' }}
                        src={eye} alt='toggle visibility' />
                </div>

                <div className='input_form' style={{ position: 'relative' }}>
                    <label>Confirm Password <span>*</span></label>
                    <input name='confirmPassword' value={formData.confirmPassword} onChange={handleChange}
                        style={{ padding: '0 40px 0 15px' }} type='password' placeholder='*********' />
                    <img style={{ position: 'absolute', top: '47px', right: '10px', width: '20px', cursor: 'pointer' }}
                        src={eye} alt='toggle visibility' />
                    <img style={{ position: 'absolute', top: '50px', right: '40px', width: '15px', cursor: 'pointer' }}
                        src={tick} alt='confirmed' />
                    <small style={{ marginLeft: '15px', fontSize: '11px' }}>8+ characters</small>
                </div>

                <Button children='Create' styles={{ width: '100%', padding: '17px 0px' }} />
            </form>
        </div>
    )
}

export default NewPasswordModal