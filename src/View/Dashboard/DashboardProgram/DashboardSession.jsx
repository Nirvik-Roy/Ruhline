import React, { useState } from 'react'
import img from '../../../assets/Images/Frame 1984078589.svg'
import clock from '../../../assets/Images/Vector (2).svg'
import video from '../../../assets/Images/Vector (3).svg'
import arrow from '../../../assets/Images/Vector (4).svg'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Button from '../../../Components/Button/Button'
import { useNavigate } from 'react-router-dom'
const DashboardSession = () => {
    const [active, setActive] = useState()
   const navigate = useNavigate()
    return (
        <>
            <div className='dashboard_content_wrapper'>
                <div className='dashboard_session_wrapper'>
                    <div className='service_date_left dashboard_session_left'>
                        <div className='service_arrow_wrapper'>
                            <img src={arrow} />
                            <h4>Session 2</h4>
                        </div>
                        <div className='service_date_img'>
                            <img src={img} />
                            <p>Olivia Bennett</p>
                        </div>
                        <div className='service_date_img'>
                            <img src={clock} style={{
                                width: '22px',
                                borderRadius: '0'
                            }} />
                            <p>30 mins</p>
                        </div>

                        <div className='service_date_img'>
                            <img src={video} style={{
                                width: '22px',
                                borderRadius: '0'
                            }} />
                            <p>Program 1</p>
                        </div>

                    </div>
                    <div className='dashboard_session_right'>
                        <Calendar className={'service_date_calendar'} />
                        <h4>Thursday, 10th August</h4>
                        <div className='time_gird_wrapper'>
                            <p onClick={(() => setActive(1))} style={active === 1 ? {
                                background: 'rgba(144, 155, 109, 1)',
                                color: "#fff"
                            } : {}}>05:00am-05:30am</p>
                            <p onClick={(() => setActive(2))} style={active === 2 ? {
                                background: 'rgba(144, 155, 109, 1)',
                                color: "#fff"
                            } : {}}>05:30am-06:00am</p>
                            <p onClick={(() => setActive(3))} style={active === 3 ? {
                                background: 'rgba(144, 155, 109, 1)',
                                color: "#fff"
                            } : {}}>06:00am- 06:30am</p>
                            <p onClick={(() => setActive(4))} style={active === 4 ? {
                                background: 'rgba(144, 155, 109, 1)',
                                color: "#fff"
                            } : {}}>06:30am- 07:00am</p>
                            <p onClick={(() => setActive(5))} style={active === 5 ? {
                                background: 'rgba(144, 155, 109, 1)',
                                color: "#fff"
                            } : {}}>07:00am- 07:30am</p>
                            <p onClick={(() => setActive(6))} style={active === 6 ? {
                                background: 'rgba(144, 155, 109, 1)',
                                color: "#fff"
                            } : {}}>07:30am- 08:00am</p>
                        </div>

                        <div className='cancel_select_button_wrapper'>

                            <button>Cancel</button>
                            <div onClick={(() => navigate('/dashboard/programs/schedule/1'))}>

                                <Button children={'Select'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardSession
