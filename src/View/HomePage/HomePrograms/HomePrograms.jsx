import React from 'react'
import './HomePrograms.css'
import HomeProgramSlider from './HomeProgramSlider'
import Button from '../../../Components/Button/Button'
const HomePrograms = () => {
    return (
        <>
            <div className='home_programs_wrapper'>
                <div className='all_Container home_programs_content_wrapper'>
                    <h1 className='all_heading'>PROGAMS</h1>
                    <h2 className='all_heading2'>Align your body. Center your mind.</h2>

                <HomeProgramSlider />
                </div>
                <div style={{
                    display:'flex',
                    justifyContent:'center'
                }}>

                <Button styles={{ padding: '15px 20px' }} children={'View All Programs'} />
                </div>
            </div>
        </>
    )
}

export default HomePrograms
