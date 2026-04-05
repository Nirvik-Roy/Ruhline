import React, { useEffect, useState } from 'react'
import './OneTimeProgram.css'
import BannerLayout from '../BannerLayout/BannerLayout'
import OneTimeServiceDetails from './OneTimeServiceDetails'
import ServiceTabs from './ServiceTabs'
import { useParams } from 'react-router-dom'
import { getSingleProgram } from '../../utils/program'
import Loaders from '../../Components/Loaders/Loaders'
const SingleProgram
 = () => {
    const { id } = useParams()
    const [loading, setloading] = useState(false)
    const [singleProgram, setsingleProgram] = useState([])

    const getSingleProgramFunction = async () => {
        setloading(true)
        const res = await getSingleProgram(id)
        setloading(false)
        setsingleProgram(res)
    }
    useEffect(() => {
        if (id) {
            getSingleProgramFunction()
        }
    }, [id])
    return (
        <>
            {loading && <Loaders />}
            <BannerLayout title={'Program 1'} />
            <div className='one_time_service_wrapper'>
                <div className='all_Container one_time_content_wrapper'>
                    <OneTimeServiceDetails singleProgramData={singleProgram} />
                    <ServiceTabs singleProgramData={singleProgram} />
                </div>
            </div>
        </>
    )
}

export default SingleProgram

