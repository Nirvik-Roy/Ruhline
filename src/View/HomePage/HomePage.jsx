import React, { useEffect } from 'react'
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
const HomePage = () => {
  const { isVerified, isRegistration, isVerifyChecking } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
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

  // const isChecking = localStorage.getItem('isChecking');
  return (
    <>
      {( isRegistration && !isVerified && !isVerifyChecking) && <VerifyModal />}
      {(isVerifyChecking && !isVerified) && <AutoVerifyModal />}
      <HomeBanner />
      <HomeAbout />
      <HomePrograms />
      <HomeChooseUs />
      <HomeCoaches />
      <HomeBlog />
    </>
  )
}

export default HomePage
