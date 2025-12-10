import React from 'react'
import Navbar from '../Layout/Navbar/Navbar'
import Footer from '../Layout/Footer/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {

    return (
        <>
    
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout
