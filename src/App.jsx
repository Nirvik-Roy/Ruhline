import { useState } from 'react'
import './App.css'
import MainLayout from './MainLayout/MainLayout'
import HomePage from './View/HomePage/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './Layout/Layout.css'
import AboutUs from './View/AboutUs/AboutUs'
import ContactUs from './View/ContactUs/ContactUs'
import PrivacyPolicy from './View/PrivacyPolicy/PrivacyPolicy'
import TermsConditions from './View/TermsConditions/TermsConditions'
import RefundPolicy from './View/RefundPolicy/RefundPolicy'
import ScrollToTop from './Components/ScrollToTop/ScrollToTop'
import Articles from './View/Articles/Articles'
import Yoga from './View/Programs/Yoga/Yoga'
import LifeCoaching from './View/Programs/LifeCoaching/LifeCoaching'
import Coaches from './View/Programs/Coaches/Coaches'
import OneTimeProgram from './View/OneTimeService/OneTimeProgram'
import AvailableFacilitor from './View/OneTimeService/AvailableFacilitor'
import ServiceDate from './View/OneTimeService/ServiceDate'
function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='' element={<MainLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/terms-conditions' element={<TermsConditions />} />
            <Route path='/refund-policy' element={<RefundPolicy />} />
            <Route path='/articles' element={<Articles />} />
            <Route path='/program'>
              <Route path='yoga' element={<Yoga />} />
              <Route path='life-coaching' element={<LifeCoaching />} />
              <Route path='coaches' element={<Coaches />} />
            </Route>
            <Route path='/onetime-service' element={<OneTimeProgram />} />
            <Route path='/available-facilitor' element={<AvailableFacilitor />} />
            <Route path='/service-date' element={<ServiceDate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
