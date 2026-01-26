import React, { useEffect } from 'react'
import './DashboardLayout.css'
import BannerLayout from '../BannerLayout/BannerLayout'
import { Outlet, useNavigate } from 'react-router-dom'
import DashboardSidebar from './DashboardSidebar/DashboardSidebar'
import { useSelector } from 'react-redux'
import Loaders from '../../Components/Loaders/Loaders'
const Dashboard = () => {
  const { isLogin,isLoading } = useSelector(state => state.auth);
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLogin) {
      navigate('/')
    }
  }, [isLogin])
  return (
    <>
      {isLoading && <Loaders/>}
      <BannerLayout title={'Dashboard'} />
      <div className='dashboard_layout_wrapper'>
        <div className='all_Container dashboard_layout_content_wrapper'>
          <DashboardSidebar />
          <Outlet />
        </div>
      </div>

    </>
  )
}

export default Dashboard
