import React from 'react'
import './BannerLayout.css'
const BannerLayout = ({title}) => {
  return (
    <>
      <div className='banner_layout_wrapper'>
        <h1>{title}</h1>
      </div>
    </>
  )
}

export default BannerLayout
