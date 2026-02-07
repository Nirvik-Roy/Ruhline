import React, { useState, useEffect } from 'react'
import '../PrivacyPolicy/PrivacyPolicy.css'
import BannerLayout from '../BannerLayout/BannerLayout'
import { getAllCmsData } from '../../utils/cms';
import Loaders from '../../Components/Loaders/Loaders';
const TermsConditions = () => {
  const [termsConditions, settermsConditions] = useState();
  const [loading, setloading] = useState(false)

  const fetchData = async () => {
    try {
      setloading(true);
      const res = await getAllCmsData('/legal-page/terms-conditions');
      console.log(res)
      settermsConditions(res?.data)
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
      <BannerLayout title={'Terms and Conditions'} />
      <div className='privacy_policy_wrapper'>
        <div className='all_Container privacy_policy_content_wrapper'>
          <p dangerouslySetInnerHTML={{
            __html: termsConditions?.content || "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus euismod, justo in porttitor dignissim, urna lacus vehicula"
          }}></p>
        </div>
      </div>
    </>
  )
}

export default TermsConditions
