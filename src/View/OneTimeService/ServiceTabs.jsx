import React, { useState } from 'react'
import ServiceExpect from './Benefits'
import HowServiceWork from './HowServiceWork'
import ServiceFAQ from './ServiceFAQ'
import ServiceReviews from './ServiceReviews'
import Benefits from './Benefits'

const ServiceTabs = ({ singleProgramData }) => {
    const [toggle, setToggle] = useState({
        toggle1: true,
        toggle2: false,
        toggle3: false,
        toggle4: false,
    })
    const toggleFunc = (id) => {
        setToggle({
            toggle1: id === 1 ? true : false,
            toggle2: id === 2 ? true : false,
            toggle3: id === 3 ? true : false,
            toggle4: id === 4 ? true : false,
        })

    }
    return (
        <>
            <div className='service_tabs_wrapper'>
                <p className={toggle.toggle1 && 'service_active'} onClick={(() => {
                    toggleFunc(1)
                })}>Benefits</p>
                <p className={toggle.toggle2 && 'service_active'} onClick={(() => {
                    toggleFunc(2)
                })}>How it works</p>
                <p className={toggle.toggle3 && 'service_active'} onClick={(() => {
                    toggleFunc(3)
                })}>FAQs</p>
                {/* <p className={toggle.toggle4 && 'service_active'} onClick={(() => {
                    toggleFunc(4)
                })}>Reviews</p> */}
            </div>
            {toggle.toggle1 && <Benefits singleProgramData={singleProgramData} />}
            {toggle.toggle2 && <HowServiceWork singleProgramData={singleProgramData} />}
            {toggle.toggle3 && <ServiceFAQ singleProgramData={singleProgramData} />}
            {/* {toggle.toggle4 && <ServiceReviews />} */}
        </>
    )
}

export default ServiceTabs
