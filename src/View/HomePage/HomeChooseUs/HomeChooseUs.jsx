import React from 'react'
import './HomeChooseUs.css'
import img from '../../../assets/Images/Rectangle 451.svg'
import HomeChooseContent from './HomeChooseContent'
const HomeChooseUs = () => {
    return (
        <>
            <div className='home_choose_us_wrapper'>
                <div className='home_choose_us_content_wrapper all_Container'>

                    <div className='home_choose_us_left'>
                        <img src={img} />
                    </div>
                    <HomeChooseContent />
                </div>
            </div>
        </>
    )
}

export default HomeChooseUs
