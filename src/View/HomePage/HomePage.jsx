import React, { useContext } from 'react'
import HomeBanner from './HomeBanner/HomeBanner'
import HomeAbout from './HomeAbout/HomeAbout'
import HomePrograms from './HomePrograms/HomePrograms'
import HomeChooseUs from './HomeChooseUs/HomeChooseUs'
import HomeCoaches from './HomeCoaches/HomeCoaches'
import HomeBlog from './HomeBlog/HomeBlog'
import { Authcontext } from '../../context/Authcontext/Authcontext'

const HomePage = () => {
  const {isLogin,setislogin} = useContext(Authcontext);
  console.log(isLogin)
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
