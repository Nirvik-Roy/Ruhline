import React from 'react'
import './BannerLayout.css'
import { useOutletContext } from 'react-router-dom'
import bg from '../../assets/Images/WhatsApp Image 2025-11-03 at 18.52.46_1d39b650 1.svg'
const BannerLayout = ({title}) => {
  const { sitesettingsData } = useOutletContext()
  return (
    <>
      <div className='banner_layout_wrapper' style={{
        backgroundImage: `url(${sitesettingsData?.page_header_image || bg})`
      }}>
        <h1>{title}</h1>
      </div>
    </>
  )
}

export default BannerLayout
