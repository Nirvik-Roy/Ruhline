import React, { useState } from 'react'
import './DashboardSupport.css'
import Button from '../../../Components/Button/Button'
import Pagination from '../../../Components/Pagination/Pagination'
import { useNavigate } from 'react-router-dom'
const DashboardSupport = () => {
    const [dropdown, setdropdown] = useState(false);
    const navigate = useNavigate()
    const dashboardSupport = [
        {
            id: '#3492',
            status: 'Open',
            color: 'rgba(231, 62, 69, 1)'
        },
        {
            id: '#3493',
            status: 'Closed',
            color: 'rgba(36, 159, 50, 1)'
        },
        {
            id: '#3494',
            status: 'Closed',
            color: 'rgba(36, 159, 50, 1)'
        },
    ]
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
                        width: '100%'
                    }}>
                        <div className='schedule_program_head'>
                            <h3 style={{
                                marginBottom: '0px',
                                fontSize: '25px'
                            }}>Support</h3>

                        </div>
                        <div onClick={(()=>navigate('/dashboard/support/add-ticket/2'))}>
        <Button children={'Add New Ticket'} />
                        </div>
                
                    </div>
                </div>


                <div className='dashboard_support_list_Wrapper'>
                    {dashboardSupport.map((e, i) => (
                        <div className='dashboard_support'>
                            <div className='dashboard_support_header'>
                                <h2>{e.id} <span>Apr 5, 2025, 10:07 AM</span></h2>
                                <div className='dashboard_support_status'>
                                    <p style={{
                                        background: `${e.color}`
                                    }}>{e.status}</p>
                                    <i onClick={(() => {
                                        if (dropdown === e.id) {
                                            setdropdown('')
                                        } else {
                                            setdropdown(e.id)
                                        }
                                    })} class="fa-solid fa-ellipsis"></i>

                                    {dropdown === e.id && <div className='dashboard_actions_wrapper'>
                                        <p onClick={(()=>navigate(`/dashboard/support/view-ticket/2`))}>View</p>
                                        <p>Edit</p>
                                        <p>Delete</p>
                                    </div>}
                                </div>
                            </div>
                            <div className='dashboard_subject_wrapper'>
                                <h4>Subject: <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit ...</span></h4>
                                <h4>Dispute Category: <span>Issue with payments</span></h4>
                            </div>
                        </div>
                    ))}

                </div>


                <Pagination />
            </div>
        </>
    )
}

export default DashboardSupport
