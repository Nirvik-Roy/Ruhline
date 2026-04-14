import React, { useEffect, useState } from 'react'
import './DashboardLayout.css'
import BannerLayout from '../BannerLayout/BannerLayout'
import { Outlet, useNavigate } from 'react-router-dom'
import DashboardSidebar from './DashboardSidebar/DashboardSidebar'
import { useSelector } from 'react-redux'
import Loaders from '../../Components/Loaders/Loaders'
import { getUserProfile } from '../../utils/user'
const Dashboard = () => {
  const { isLogin, isLoading } = useSelector(state => state.auth);
  const navigate = useNavigate()
  const [profileData, setprofileData] = useState([])
  const [loading, setloading] = useState(false)
  const getProfileFunc = async () => {
    setloading(true)
    const result = await getUserProfile();
    setprofileData(result?.user || [])
    setloading(false)
  }
  useEffect(() => {
    getProfileFunc()
  }, [isLogin])
  useEffect(() => {
    if (!isLogin) {
      navigate('/')
    }
  }, [isLogin])
  return (
    <>
      {(isLoading || loading) && <Loaders />}
      <BannerLayout title={'Dashboard'} />
      <div className='dashboard_layout_wrapper'>
        <div className='all_Container dashboard_layout_content_wrapper'>
          <DashboardSidebar />
          <Outlet context={{ profileData: profileData }} />
        </div>
      </div>

    </>
  )
}

export default Dashboard
