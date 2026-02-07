import React, { useEffect, useState } from 'react'
import './PrivacyPolicy.css'
import BannerLayout from '../BannerLayout/BannerLayout'
import Loaders from '../../Components/Loaders/Loaders';
import { getAllCmsData } from '../../utils/cms';
const PrivacyPolicy = () => {
    const [privacyPolicy, setprivacyPolicy] = useState();
    const [loading, setloading] = useState(false)

    const fetchData = async () => {
        try {
            setloading(true);
            const res = await getAllCmsData('/legal-page/privacy-policy');
            console.log(res)
            setprivacyPolicy(res?.data)
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
            <BannerLayout title={'Privacy Policy'} />
            <div className='privacy_policy_wrapper'>
                <div className='all_Container privacy_policy_content_wrapper'>
                    <p dangerouslySetInnerHTML={{
                        __html: privacyPolicy?.content || "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus euismod, justo in porttitor dignissim, urna lacus vehicula"
                    }}></p>
                </div>
            </div>
        </>
    )
}

export default PrivacyPolicy
