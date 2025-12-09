import React from 'react'
import './HomeCoaches.css'
import Button from '../../../Components/Button/Button'
import HomeCoachesSlider from './HomeCoachesSlider'
const HomeCoaches = () => {
    return (
        <>
            <div className='home_coaches_wrapper'>
                <div className='all_Container'>
                    <div className='home_coaches_head_wrapper'>
                        <div className='home_coaches_head'>
                            <h2 className='all_heading'>Coaches</h2>
                            <h1 className='all_heading2'>Guidance That Feels Personal</h1>
                        </div>
                        <Button styles={{ padding: '15px 50px', }} children={'View All'} />
                    </div>
                    <HomeCoachesSlider />
                </div>
            </div>
        </>
    )
}

export default HomeCoaches
