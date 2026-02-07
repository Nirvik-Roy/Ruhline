import React, { useEffect, useState } from 'react'
import HomeBanner from './HomeBanner/HomeBanner'
import HomeAbout from './HomeAbout/HomeAbout'
import HomePrograms from './HomePrograms/HomePrograms'
import HomeChooseUs from './HomeChooseUs/HomeChooseUs'
import HomeCoaches from './HomeCoaches/HomeCoaches'
import HomeBlog from './HomeBlog/HomeBlog'
import { useDispatch, useSelector } from 'react-redux'
import VerifyModal from './VerifyModal/VerifyModal'
import AutoVerifyModal from './VerifyModal/AutoVerifyModal'
import { useLocation } from 'react-router-dom'
import { Autoverify } from '../../../Store/Slices/Loginslice/AutoVerfiySlice'
import ResendLinkModal from '../ResendLinkModal/ResendLinkModal'
import { getAllCmsData } from '../../utils/cms'
import Loaders from '../../Components/Loaders/Loaders'
const HomePage = () => {
  const { isVerified, isRegistration, isVerifyChecking } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [verificationModal, setverificationModal] = useState(false);
  const [reSendModal, setreSendModal] = useState(false);
  const [loading, setloading] = useState(false)
  const [homePageData, sethomePageData] = useState([])
  useEffect(() => {
    // Check path
    if (location.pathname.startsWith("/verify-email")) {
      // Extract query params
      const params = new URLSearchParams(location.search);
      const id = params.get("id");
      const hash = params.get("hash");
      const expires = params.get("expires");
      const signature = params.get("signature");
      // Only dispatch if all present
      if (id && hash && expires && signature) {
        const data = { id, hash, expires, signature };
        if (data.id != '', data.hash != '', data.expires != '', data.signature != '') {
          dispatch(Autoverify(data));
        }
      }
    }
  }, [location, dispatch]);


  useEffect(() => {
    if (isRegistration) {
      setverificationModal(true)
    }
  }, [isRegistration])

  const fetchData = async () => {
    try {
      setloading(true);
      const res = await getAllCmsData('/home-page');
      console.log(res)
      sethomePageData(res?.data)
    } catch (err) {
      console.log(err)
    } finally {
      setloading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  // const isChecking = localStorage.getItem('isChecking');
  return (
    <>
      {loading && <Loaders />}
      {verificationModal && <VerifyModal setreSendModal={setreSendModal} setverificationModal={setverificationModal} />}
      {reSendModal && <ResendLinkModal setreSendModal={setreSendModal} />}
      {(isVerifyChecking && !isVerified) && <AutoVerifyModal />}
      <HomeBanner data={homePageData?.section_01
      } />
      <HomeAbout data={homePageData?.section_02}/>
      <HomePrograms data={homePageData?.section_03} />
      <HomeChooseUs data={homePageData?.section_04} />
      <HomeCoaches data={homePageData?.section_05} />
      <HomeBlog data={homePageData?.section_06} />
    </>
  )
}

export default HomePage
