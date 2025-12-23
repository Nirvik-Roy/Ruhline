import React from 'react'
import './Dashboard.css'
import img from '../../../assets/Images/Group.png'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='dashboard_content_wrapper'>
                <h3>Dashboard</h3>
                <div className='dashboard_cards_wrapper'>
                    <div className='dashboard_card'>
                        <img src={img} />
                        <h4>Upcoming Appointments</h4>
                        <h2>04</h2>
                    </div>

                    <div className='dashboard_card'>
                        <img src={img} />
                        <h4>Completed Programs</h4>
                        <h2>08</h2>
                    </div>

                    <div className='dashboard_card'>
                        <img src={img} />
                        <h4>Enrolled Programs</h4>
                        <h2>12</h2>
                    </div>
                </div>

                <h3>Quick Actions</h3>
                <div className='quick_actions_buttons_wrapper'>
                    <button className='quick_action_btn'>Raise a Dispute</button>
                    <button onClick={(()=>navigate('/dashboard/change-password/2'))} className='quick_action_btn'>Change Password</button>
                    <button className='quick_action_btn'>Delete Account</button>
                </div>
            </div>
        </>
    )
}

export default Dashboard
