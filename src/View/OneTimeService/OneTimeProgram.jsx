import React from 'react'
import './OneTimeProgram.css'
import BannerLayout from '../BannerLayout/BannerLayout'
import OneTimeServiceDetails from './OneTimeServiceDetails'
import ServiceTabs from './ServiceTabs'
const OneTimeProgram = () => {
    return (
        <>
            <BannerLayout title={'Program 1'} />
            <div className='one_time_service_wrapper'>
                <div className='all_Container one_time_content_wrapper'>
                    <OneTimeServiceDetails />
                    <ServiceTabs/>
                </div>

            </div>
        </>
    )
}

export default OneTimeProgram
