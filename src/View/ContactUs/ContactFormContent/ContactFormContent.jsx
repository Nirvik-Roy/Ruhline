import React, { useState, useEffect } from 'react'
import './ContactFormContent.css'
import Input from '../../../Components/Inputs/Input'
import Textarea from '../../../Components/Inputs/Textarea'
import Button from '../../../Components/Button/Button'
import phone from '../../../assets/Images/Frame 831.svg'
import mail from '../../../assets/Images/.svg'
import toast from 'react-hot-toast'
import axios from 'axios'
import Loaders from '../../../Components/Loaders/Loaders'
import { getPhoneCountryCode } from '../../../utils/location'
const ContactFormContent = () => {
    const [loading, setLoading] = useState(false);
    const [emailErrormessage, setEmailerrorMessage] = useState('');
    const [errors, setErrors] = useState([])
    const [phoneData, setPhoneData] = useState([]);

    const [formData, setformData] = useState({
        name: '',
        email: '',
        phone: '',
        phone_country_code_id: '5',
        message: ''
    })
    useEffect(() => {
        const fetchPhone = async () => {
            setLoading(true)
            try {
                const result = await getPhoneCountryCode();
                setPhoneData(result);
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchPhone()
    }, [])


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

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            ValidateEmail(value)
        }
        setformData({
            ...formData,
            [name]: value
        })
    }
    const postContactForm = async () => {
        const { name, email, phone, phone_country_code_id, message } = formData;
        if (name != '' && email != '' && phone != '' && phone_country_code_id != '' && message != '') {
            setLoading(true)
            try {
                const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/contact`, formData);
                if (res.data.success == true) {
                    toast.success(res.data?.message || 'Contact form submitted succesfully');
                    return res.data.data
                }
            } catch (err) {
                toast.error(err.response?.data?.message);
                setErrors(err.response.data.errors)
            } finally {
                setLoading(false)
            }
        } else {
            toast.error('Plz enter all the fileds...')
        }
    }
    return (
        <>
            {loading && <Loaders />}
            <div className='contact_us_form_wrapper'>
                <h1 className='all_heading2'>Get in Touch</h1>
                <p>Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.</p>
                <form className='contact_us_form_wrapper_main'>
                    <div>
                        <Input onChange={handleChange} name={'name'} value={
                            formData.name
                        } label={'Name'} required={true} placeholder={'Enter your name'} />

                        <small style={{
                            fontSize: '0.7rem',
                            display: 'block',
                            marginTop: '5px',
                            color: 'red'
                        }}>{errors.name && errors.name[0]}</small>
                    </div>
                    <div>
                        <Input name={'email'} value={formData.email} onChange={handleChange} label={'Email'} required={true} placeholder={'Enter your email'} />
                        <small style={{
                            marginLeft: '15px',
                            fontSize: '11px',
                            marginTop: '-15px',
                            color: 'rgba(255, 0, 0, 1)',
                            cursor: 'pointer'
                        }}>{errors.email ? errors.email[0] : emailErrormessage}</small>
                    </div>
                    <div className='input_form confirm_input_form'>
                        <label>Phone no<span>*</span></label>
                        <div className='phone_input_Wrapper656'>
                            <select name='phone_country_code_id' onChange={handleChange} value={formData.phone_country_code_id} style={{
                                border: 'none',
                                borderRight: '2px solid #000',
                                outline: 'none'
                            }}>
                                {phoneData?.map((e,) => (
                                    <option key={e.id} value={e.id}>+{e.phone_code}</option>
                                ))}
                            </select>
                            <input onChange={handleChange} name='phone' value={formData.phone} placeholder='Enter phone number' />
                        </div>

                        <small style={{
                            fontSize: '0.7rem',
                            display: 'block',
                            marginTop: '5px',
                            color: 'red'
                        }}>{errors?.phone && errors?.phone[0]}</small>
                    </div>
                    <div>

                        <Textarea name={'message'} onChange={handleChange} value={formData.message} label={'Message '} required={true} placeholder={'Type your message'} />
                        <small style={{
                            fontSize: '0.7rem',
                            display: 'block',
                            marginTop: '5px',
                            color: 'red'
                        }}>{errors?.message && errors?.message[0]}</small>
                    </div>
                    <div onClick={(() => postContactForm())}>
                        <Button children={'Send'} styles={{ padding: '15px 70px' }} />
                    </div>

                    <div className='phone_email_wrapper'>
                        <div className='phone_wrapper'>
                            <img src={phone} />
                            <div>
                                <h5>PHONE</h5>
                                <span>03 5432 1234</span>
                            </div>
                        </div>
                        <div className='phone_wrapper'>
                            <img src={mail} />
                            <div>
                                <h5>EMAIL</h5>
                                <span>info@marcc.com.au</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ContactFormContent
