import React from 'react'
import img from '../../assets/Images/Rectangle 446 (1).svg'
import ProgramFaqAccordion from './ProgramFaqAccordion'
const ServiceFAQ = ({ singleProgramData }) => {
    return (
        <>
            <div className='service_expect_wrapper'>
                <div className='service_expert_left'>
                    <h1 className='all_heading2'>FAQs</h1>
                    <ProgramFaqAccordion singleData={singleProgramData} />
                </div>
                {singleProgramData?.faqs?.length > 0 && <div className='service_expert_right service_long_img'>
                    <img src={singleProgramData?.faqs_section_image || img} />
                </div>}
            </div>
        </>
    )
}

export default ServiceFAQ
