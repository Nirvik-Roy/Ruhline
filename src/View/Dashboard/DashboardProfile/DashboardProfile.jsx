import React from 'react'
import './DashboardProfile.css'
import Button from '../../../Components/Button/Button'
import userImg from '../../../assets/Images/User Info.png'
import { useNavigate } from 'react-router-dom'
const DashboardProfile = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='dashboard_content_wrapper'>
                <div className='schedule_program_head_wrapper' style={{
                    marginBottom: '30px'
                }}>
                    <div className='schedule_program_back_wrapper' style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        flexWrap: 'wrap',
                        gap: '15px'
                    }}>
                        <div className='schedule_program_head'>
                            <h3 style={{
                                marginBottom: '0px',
                                fontSize: '25px'
                            }}>My Profile</h3>

                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            gap: '10px',
                            marginLeft: 'auto'
                        }}>
                            <div onClick={(() => navigate('/dashboard/edit-profile/2'))}>
                                <Button children={'Edit Profile'} />
                            </div>
                            <div onClick={(() => navigate('/dashboard/change-password/2'))}>
                                <Button children={'Change Password'} styles={{ border: '1px solid var(--primary-color)', backgroundColor: 'transparent', color: 'var(--text-color)' }} />

                            </div>
                        </div>

                    </div>
                </div>

                <div className='profile_dashboard_Wrapper'>
                    <img src={userImg} />
                    <div className='profile_details_wrapper'>
                        <h1>My Profile</h1>
                        <div className='ticket_details_list_wrapper'>
                            <p>Name: <span>Bidisha Bhowmick</span></p>
                            <p>Email: <span>shallamb@gmail.com</span></p>
                            <p>Phone: <span>Issue with program</span></p>
                            <p>Program: <span>+1 (234) 464-0600</span></p>
                            <p>Address: <span>Office 149, 450 South Brand Brooklyn
                                San Diego County, CA 91905, USA</span></p>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default DashboardProfile
