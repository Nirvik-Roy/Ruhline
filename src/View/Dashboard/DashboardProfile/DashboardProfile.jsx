import React, { useEffect, useState } from 'react'
import './DashboardProfile.css'
import Button from '../../../Components/Button/Button'
import userImg from '../../../assets/Images/User Info.png'
import { useNavigate } from 'react-router-dom'
import { getUserProfile } from '../../../utils/user'
import Loaders from '../../../Components/Loaders/Loaders.jsx'
const DashboardProfile = () => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false);
    const [profileData, setprofileData] = useState([])
    const getProfileFunc = async () => {
        setLoader(true)
        try {
            const result = await getUserProfile();
            setprofileData(result.user)
        } catch (err) {
            console.log(err)
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        getProfileFunc()
    }, [])

    console.log(profileData)
    return (
        <>
            {loader && <Loaders />}
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
                            <div onClick={(() => navigate('/dashboard/edit-profile/'))}>
                                <Button children={'Edit Profile'} />
                            </div>
                            <div onClick={(() => navigate('/dashboard/change-password/'))}>
                                <Button children={'Change Password'} styles={{ border: '1px solid var(--primary-color)', backgroundColor: 'transparent', color: 'var(--text-color)' }} />

                            </div>
                        </div>

                    </div>
                </div>

                <div className='profile_dashboard_Wrapper'>
                    <img src={profileData?.profile?.profile_image ? profileData?.profile?.profile_image : userImg} />
                    <div className='profile_details_wrapper'>
                        <h1>My Profile</h1>
                        <div className='ticket_details_list_wrapper'>
                            <p>Name: <span>{profileData?.first_name} {profileData?.last_name}</span></p>
                            <p>Email: <span>{profileData?.email}</span></p>
                            {(profileData?.profile?.phone_country_code?.phone_code && profileData?.profile?.phone) && <p>Phone: +<span>{profileData?.profile?.phone_country_code?.phone_code}  {profileData?.profile?.phone}</span></p>}
                            {/* <p>Program: <span>+1 (234) 464-0600</span></p> */}
                            {(profileData?.profile?.address_line_1 && profileData?.profile?.address_line_2) && <p>Address: <span>{profileData?.profile?.address_line_1} {profileData?.profile?.address_line_2}</span></p>}
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default DashboardProfile
