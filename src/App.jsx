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
import ConfirmBooking from './View/OneTimeService/ConfirmBooking/ConfirmBooking'
import DashboardLayout from './View/Dashboard/DashboardLayout'
import Dashboard from './View/Dashboard/Dashboard/Dashboard.jsx'
import DashboardProgram from './View/Dashboard/DashboardProgram/DashboardProgram.jsx'
import DashboardProgramSchedule from './View/Dashboard/DashboardProgram/DashboardProgramSchedule.jsx'
import DashboardSession from './View/Dashboard/DashboardProgram/DashboardSession.jsx'
import LiveProgram from './View/Dashboard/DashboardProgram/LiveProgram.jsx'
import DashboardCalendar from './View/Dashboard/DashboardCalendar/DashboardCalendar.jsx'
import CalendarDatesPrograms from './View/Dashboard/DashboardCalendar/CalendarDatesPrograms.jsx'
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
            <Route path='/onetime-service/:id' element={<OneTimeProgram />} />
            <Route path='/available-facilitor' element={<AvailableFacilitor />} />
            <Route path='/service-date' element={<ServiceDate />} />
            <Route path='/confirm-booking' element={<ConfirmBooking />} />

            {/* Dashboard Routes */}
            <Route path='/dashboard' element={<DashboardLayout />}>
              <Route path='' element={<Dashboard />} />
              <Route path='programs' element={<DashboardProgram />} ></Route>
              <Route path='programs/schedule/:id' element={<DashboardProgramSchedule />} />
              <Route path='programs/session/:id' element={<DashboardSession />} />
              <Route path='programs/live-programs/:id' element={<LiveProgram/>}/>
              <Route path='calendar' element={<DashboardCalendar/>}/>
              <Route path='calendar/programs/:id' element={<CalendarDatesPrograms/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
