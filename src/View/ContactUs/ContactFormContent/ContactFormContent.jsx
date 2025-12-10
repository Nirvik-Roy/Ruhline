import React from 'react'
import './ContactFormContent.css'
import Input from '../../../Components/Inputs/Input'
import Textarea from '../../../Components/Inputs/Textarea'
import Button from '../../../Components/Button/Button'
import phone from '../../../assets/Images/Frame 831.svg'
import mail from '../../../assets/Images/.svg'
const ContactFormContent = () => {
    return (
        <>
            <div className='contact_us_form_wrapper'>
                <h1 className='all_heading2'>Get in Touch</h1>
                <p>Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.</p>
                <form className='contact_us_form_wrapper_main'>
                    <Input label={'Name'} required={true} placeholder={'Enter your name'} />
                    <Input label={'Email'} required={true} placeholder={'Enter your email'} />
                    <Input label={'Phone number '} required={true} placeholder={'Enter your phone number'} />
                    <Textarea label={'Message '} required={true} placeholder={'Type your message'} />
                    <Button children={'Send'} styles={{ padding: '15px 70px' }} />

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
