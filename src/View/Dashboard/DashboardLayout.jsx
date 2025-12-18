import React from 'react'
import './DashboardLayout.css'
import BannerLayout from '../BannerLayout/BannerLayout'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from './DashboardSidebar/DashboardSidebar'
const Dashboard = () => {
  return (
    <>
      <BannerLayout title={'Dashboard'} />
      <div className='dashboard_layout_wrapper'>
        <DashboardSidebar />
        <Outlet />
      </div>
    </>
  )
}

export default Dashboard
