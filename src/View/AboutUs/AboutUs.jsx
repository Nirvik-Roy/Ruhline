import React, { useState, useEffect } from 'react'
import './AboutUs.css'
import HomeAbout from '../HomePage/HomeAbout/HomeAbout'
import BannerLayout from '../BannerLayout/BannerLayout'
import AboutCards from './AboutCards/AboutCards'
import MeetFounder from './MeetFounder/MeetFounder'
import { getAllCmsData } from '../../utils/cms'
import Loaders from '../../Components/Loaders/Loaders'
import DashboardLoader from '../../Components/Loaders/DashboardLoader'
const AboutUs = () => {
    const [loading, setloading] = useState(false);
    const [aboutData, setaboutData] = useState()
    const fetchData = async () => {
        try {
            setloading(true);
            const res = await getAllCmsData('/about-page');
            if (res?.success) {
                setaboutData(res?.data)
            }
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
            <BannerLayout title={'About Us'} />
            {loading && <div style={{
                minHeight: '70vh',
                position: 'relative'
            }}>

                {<DashboardLoader />}
            </div>}
            {!loading && <>
                <HomeAbout data={aboutData?.section_01} />
                <AboutCards data={aboutData?.section_02?.mission_vision_values} />
                <MeetFounder data={aboutData?.section_03} />
            </>}
        </>
    )
}

export default AboutUs
