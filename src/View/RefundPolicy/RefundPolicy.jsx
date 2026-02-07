
import React, { useState, useEffect } from 'react'
import '../PrivacyPolicy/PrivacyPolicy.css'
import BannerLayout from '../BannerLayout/BannerLayout'
import { getAllCmsData } from '../../utils/cms';
import Loaders from '../../Components/Loaders/Loaders';
const RefundPolicy = () => {
    const [refundpolicy, setrefundpolicy] = useState();
    const [loading, setloading] = useState(false)

    const fetchData = async () => {
        try {
            setloading(true);
            const res = await getAllCmsData('/legal-page/refund-policy');
            console.log(res)
            setrefundpolicy(res?.data)
        } catch (err) {
            console.lof(err)
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
            <BannerLayout title={'Refund Policy'} />
            <div className='privacy_policy_wrapper'>
                <div className='all_Container privacy_policy_content_wrapper'>
                    <p dangerouslySetInnerHTML={{
                        __html: refundpolicy?.content || "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus euismod, justo in porttitor dignissim, urna lacus vehicula"
                    }}></p>
                </div>
            </div>
        </>
    )
}

export default RefundPolicy
