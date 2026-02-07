import React from 'react'
import './MeetFounder.css'
import img from '../../../assets/Images/Rectangle 447.png'
import MeetFounderContent from './MeetFounderContent'
const MeetFounder = ({data}) => {
    return (
        <>
            <div className='about_us_wrapper'>
                <div className='all_Container  meet_founder_wrapper'>
                    <MeetFounderContent data={data} />
                    <div className='about_us_image'>
                        <img src={data?.image || img} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MeetFounder
