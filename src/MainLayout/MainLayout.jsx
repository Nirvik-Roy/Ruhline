import React, { useEffect, useState } from 'react'
import Navbar from '../Layout/Navbar/Navbar'
import Footer from '../Layout/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { getAllCmsData } from '../utils/cms'
import Loaders from '../Components/Loaders/Loaders'

const MainLayout = () => {
    const [loading, setloading] = useState(false);
    const [data, setData] = useState()
    const fetchData = async () => {
        try {
            setloading(true);
            const res = await getAllCmsData('/site-setting');
            setData(res?.data)
            console.log(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const favicon = document.getElementById('favicon');
        if (favicon) {
            favicon.href = data?.favicon || '/logo.svg'
        }
    }, [data])
    return (
        <>
            {loading && <Loaders />}
            <Navbar navbarData={data} />
            <Outlet />
            <Footer footerData={data} />
        </>
    )
}

export default MainLayout
