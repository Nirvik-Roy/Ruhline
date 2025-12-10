import React from 'react'
import './ContactUsForm.css'
import ContactFormContent from '../ContactFormContent/ContactFormContent'
import img from '../../../assets/Images/Rectangle 453.png'
import FAQ from '../FAQ/FAQ'
const ContactUsForm = () => {
    return (
        <>
            <div className='contact_us_wrapper'>
                <div className='all_Container contact_us_content_wrapper'>
                    <div className='contact_us_img'>
                        <img src={img}/>
                    </div>
                    <ContactFormContent />
                </div>
                <FAQ/>
            </div>
        </>
    )
}

export default ContactUsForm
