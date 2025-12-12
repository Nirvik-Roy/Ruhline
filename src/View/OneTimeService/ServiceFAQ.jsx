import React from 'react'
import img from '../../assets/Images/Rectangle 446 (1).svg'
import FAQAccordion from '../ContactUs/FAQ/FAQAccordion'
const ServiceFAQ = () => {
    return (
        <>
            <div className='service_expect_wrapper'>
                <div className='service_expert_left'>
                    <h1 className='all_heading2'>FAQs</h1>
                    <FAQAccordion/>
                </div>
                <div className='service_expert_right service_long_img'>
                    <img src={img} />
                </div>
            </div>
        </>
    )
}

export default ServiceFAQ
