import React from 'react'
import HomeBanner from './HomeBanner/HomeBanner'
import HomeAbout from './HomeAbout/HomeAbout'
import HomePrograms from './HomePrograms/HomePrograms'
import HomeChooseUs from './HomeChooseUs/HomeChooseUs'
import HomeCoaches from './HomeCoaches/HomeCoaches'
import HomeBlog from './HomeBlog/HomeBlog'

const HomePage = () => {
  return (
    <>
      <HomeBanner/>
      <HomeAbout/>
      <HomePrograms/>
      <HomeChooseUs/>
      <HomeCoaches/>
      <HomeBlog/>
    </>
  )
}

export default HomePage
