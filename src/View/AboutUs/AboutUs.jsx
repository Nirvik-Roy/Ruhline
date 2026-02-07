import React, { useState, useEffect } from 'react'
import './AboutUs.css'
import HomeAbout from '../HomePage/HomeAbout/HomeAbout'
import BannerLayout from '../BannerLayout/BannerLayout'
import AboutCards from './AboutCards/AboutCards'
import MeetFounder from './MeetFounder/MeetFounder'
import { getAllCmsData } from '../../utils/cms'
import Loaders from '../../Components/Loaders/Loaders'
const AboutUs = () => {
    const [loading, setloading] = useState(false);
    const [aboutData, setaboutData] = useState()
    const fetchData = async () => {
        try {
            setloading(true);
            const res = await getAllCmsData('/about-page');
            console.log(res)
            setaboutData(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            {loading && <Loaders />}
            <BannerLayout title={'About Us'} />
            <HomeAbout data={aboutData?.section_01}/>
            <AboutCards data={aboutData?.section_02?.mission_vision_values} />
            <MeetFounder data={aboutData?.section_03}/>
        </>
    )
}

export default AboutUs
