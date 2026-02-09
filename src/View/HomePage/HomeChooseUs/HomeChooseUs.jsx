import React from 'react'
import './HomeChooseUs.css'
import img from '../../../assets/Images/Rectangle 451.svg'
import HomeChooseContent from './HomeChooseContent'
const HomeChooseUs = ({ data }) => {
    console.log(data)
    return (
        <>
            <div className='home_choose_us_wrapper' 
            style={{
                backgroundImage: `url(${data?.background_image || '../../../assets/Images/Rectangle 452.png'})`
            }}
            
            >
                <div className='home_choose_us_content_wrapper all_Container'>

                    <div className='home_choose_us_left'>
                        <img src={data?.why_choose_us_section_image || img} />
                    </div>
                    <HomeChooseContent data={data} />
                </div>
            </div>
        </>
    )
}

export default HomeChooseUs
