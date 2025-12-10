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
function App() {
  const PublicRoutes = [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/about',
      element: <AboutUs />
    },
    {
      path: '/contact',
      element: <ContactUs />
    },
    {
      path: '/privacy-policy',
      element: <PrivacyPolicy />
    },
    {
      path: '/terms-conditions',
      element: <TermsConditions />
    },
    {
      path: '/refund-policy',
      element: <RefundPolicy />
    },
    {
      path: '/articles',
      element: <Articles />
    },
    {
      path: '/program/yoga',
      element: <Yoga />
    },
    {
      path: '/program/life-coaching',
      element: <LifeCoaching />
    },
    {
      path: '/program/coaches',
      element: <Coaches />
    }
  ]

  return (
    <>

      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='' element={<MainLayout />}>
            {PublicRoutes.map((e, i) => (
              <Route key={e.path} path={e.path} element={e.element} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
