import React, { useEffect, useState } from 'react'
import HomeBanner from './HomeBanner/HomeBanner'
import HomeAbout from './HomeAbout/HomeAbout'
import HomePrograms from './HomePrograms/HomePrograms'
import HomeChooseUs from './HomeChooseUs/HomeChooseUs'
import HomeCoaches from './HomeCoaches/HomeCoaches'
import HomeBlog from './HomeBlog/HomeBlog'
import { getAllCmsData } from '../../utils/cms'
import Loaders from '../../Components/Loaders/Loaders'
import { useOutletContext } from 'react-router-dom'
const HomePage = () => {
  const [homePageData, sethomePageData] = useState([])
  const { setGlobalLoading } = useOutletContext()
  const fetchData = async () => {
    try {
      setGlobalLoading(true);
      const res = await getAllCmsData('/home-page');
      console.log(res)
      sethomePageData(res?.data)
    } catch (err) {
      console.log(err)
    } finally {
      setGlobalLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  // const isChecking = localStorage.getItem('isChecking');
  return (
    <>
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
