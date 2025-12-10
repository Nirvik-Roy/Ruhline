import React, { useState } from 'react'
import './FAQ.css'
import FAQAccordion from './FAQAccordion'
const FAQ = () => {
    const [toggle, setToggle] = useState({
        toggle1: false,
        toggle2: false,
    })

    const toggleFunction = (i) => {
        setToggle({
            toggle1: i === 1 ? true : false,
            toggle2: i === 2 ? true : false
        })
    }
    return (
        <>
            <div className='faq_wrapper'>
                <div className='all_Container faq_content_wrapper'>
                    <h2 className='all_heading'>FAQS</h2>
                    <h1 className='all_heading2'>Guidance That Feels Personal</h1>

                    <div className='mentor_wrapper'>
                        <p onClick={(() => toggleFunction(1))} style={toggle.toggle1 ? {
                            borderBottom: '2px solid var(--text-color)'
                        } : {}}>Mentee</p>
                        <p style={toggle.toggle2 ? {
                            borderBottom: '2px solid var(--text-color)'
                        } : {}} onClick={(() => toggleFunction(2))}>Mentor</p>
                    </div>
                    <FAQAccordion />
                </div>

            </div>
        </>
    )
}

export default FAQ
