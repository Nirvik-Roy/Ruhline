import { useState } from 'react'
import './App.css'
import MainLayout from './MainLayout/MainLayout'
import HomePage from './View/HomePage/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './Layout/Layout.css'
function App() {
  const PublicRoutes = [
    {
      path: '/',
      element: <HomePage />
    }
  ]
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<MainLayout />}>
            {PublicRoutes.map((e, i) => (
              <Route path={e.path} element={e.element} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
