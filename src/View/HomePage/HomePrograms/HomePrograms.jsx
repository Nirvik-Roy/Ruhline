import React from 'react'
import './HomePrograms.css'
import HomeProgramSlider from './HomeProgramSlider'
import Button from '../../../Components/Button/Button'
import { useNavigate } from 'react-router-dom'
const HomePrograms = ({ data }) => {
    const navigate = useNavigate()
    return (
        <>
            <div className='home_programs_wrapper'>
                <div className='all_Container home_programs_content_wrapper'>
                    <h1 className='all_heading' dangerouslySetInnerHTML={{
                        __html: data?.headline || "PROGAMS"
                    }}></h1>
                    <h2 className='all_heading2' dangerouslySetInnerHTML={{
                        __html: data?.secondary_headline || "Align your body. Center your mind."
                    }}></h2>

                <HomeProgramSlider />
                </div>
                <div style={{
                    display:'flex',
                    justifyContent:'center'
                }}>

                <Button onClick={(()=>navigate('/program/category/1'))} styles={{ padding: '15px 20px' }} children={'View All Services'} />
                </div>
            </div>
        </>
    )
}

export default HomePrograms
