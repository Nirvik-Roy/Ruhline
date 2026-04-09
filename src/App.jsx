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
import Yoga from './View/Programs/SingleCategory/SingleProgramCategory.jsx'
import LifeCoaching from './View/Programs/LifeCoaching/LifeCoaching'
import Coaches from './View/Programs/Coaches/Coaches'
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
import DashboardSupport from './View/Dashboard/DashboardSupport/DashboardSupport.jsx'
import AddNewTicket from './View/Dashboard/DashboardSupport/AddNewTicket.jsx'
import ViewTicket from './View/Dashboard/DashboardSupport/ViewTicket.jsx'
import DashboardProfile from './View/Dashboard/DashboardProfile/DashboardProfile.jsx'
import EditProfile from './View/Dashboard/DashboardProfile/EditProfile.jsx'
import ProfilePassword from './View/Dashboard/DashboardProfile/ProfilePassword.jsx'
import SingleArticle from './View/Articles/SingleArticle.jsx'
import DashboardPurchaseHistory from './View/Dashboard/DashboardPurchaseHistory/DashboardPurchaseHistory.jsx'
import SinglePurchaseHistory from './View/Dashboard/DashboardPurchaseHistory/SinglePurchaseHistory.jsx'
import AddNote from './Components/AddNote/AddNote.jsx'
import { Toaster } from 'react-hot-toast'
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx'
import PublicRoute from './PublicRoute/PublicRoute.jsx'
import DashboardHabit from './View/Dashboard/DashboardHabit/DashboardHabit.jsx'
import SingleProgramCategory from './View/Programs/SingleCategory/SingleProgramCategory.jsx'
import SingleProgram from './View/OneTimeService/SingleProgram.jsx'
import EditTicket from './View/Dashboard/DashboardSupport/EditTicket.jsx'
function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position='top-right' />
        <ScrollToTop />
        <Routes>
          <Route path='' element={<MainLayout />}>
            {/* <Route path='' element={<PublicRoute />}> */}
              <Route path='/verify-email' element={<HomePage />} />
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutUs />} />
              <Route path='/contact' element={<ContactUs />} />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/terms-conditions' element={<TermsConditions />} />
              <Route path='/refund-policy' element={<RefundPolicy />} />
              <Route path='/articles' element={<Articles />} />
              <Route path='/single-articles/:id' element={<SingleArticle />} />
              <Route path='/program'>
                <Route path='category/:id' element={<SingleProgramCategory />} />
                <Route path='life-coaching' element={<LifeCoaching />} />
                <Route path='coaches' element={<Coaches />} />
              </Route>
              <Route path='/single-program/:id' element={<SingleProgram />} />
              <Route path='/available-facilitor/:id' element={<AvailableFacilitor />} />
              <Route path='/service-date/:id/:coachName/:coachId' element={<ServiceDate />} />
              <Route path='/confirm-booking/:id/:coachId' element={<ConfirmBooking />} />
            {/* </Route> */}

            {/* Dashboard Routes */}
            <Route path='/dashboard' element={<PrivateRoute />}>
              <Route path='/dashboard' element={<DashboardLayout />}>
                <Route path='' element={<Dashboard />} />
                <Route path='programs' element={<DashboardProgram />} ></Route>
                <Route path='programs/schedule/:id' element={<DashboardProgramSchedule />} />
                <Route path='programs/session/:id' element={<DashboardSession />} />
                <Route path='programs/live-programs/:id' element={<LiveProgram />} />
                <Route path='calendar' element={<DashboardCalendar />} />
                <Route path='calendar/programs/:id' element={<CalendarDatesPrograms />} />
                <Route path='support' element={<DashboardSupport />} />
                <Route path='support/add-ticket/:id' element={<AddNewTicket />} />
                <Route path='support/view-ticket/:id' element={<ViewTicket />} />
                <Route path='support/edit-ticket/:id' element={<EditTicket/>}/>
                <Route path='profile/' element={<DashboardProfile />} />
                <Route path='edit-profile/' element={<EditProfile />} />
                <Route path='change-password' element={<ProfilePassword />} />
                <Route path='purchase' element={<DashboardPurchaseHistory />} />
                <Route path='purchase/single-purchase/:id' element={<SinglePurchaseHistory />} />
                <Route path='habits' element={<DashboardHabit/>}/>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
