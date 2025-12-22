import React, { useState } from 'react'
import arrow from '../../../assets/Images/Vector (4).svg'
import img from '../../../assets/Images/image.png'
import disableLink from '../../../assets/Images/Layer_5.svg'
import link from '../../../assets/Images/Vector (6).svg'
import { useNavigate } from 'react-router-dom'
import FeedBackModal from '../DashboardProgram/FeedBackModal'
const CalendarDatesPrograms = () => {
    const navigate = useNavigate();
    const [feedbackModal,setfeedBackModal]=useState(false)
    return (
        <>
        {feedbackModal && <FeedBackModal setfeedBackModal={setfeedBackModal}/>}
            <div className='dashboard_content_wrapper'>
                <div className='schedule_program_head_wrapper' style={{
                    marginBottom: '30px'
                }}>
                    <div className='schedule_program_back_wrapper'>
                        <img onClick={(() => navigate(-1))} src={arrow} />
                        <div className='schedule_program_head'>
                            <h3>6th January 2024</h3>
                        </div>
                    </div>
                </div>

                <div className='calendar_dates_porgrams_wrapper'>
                    <div className='calendar_program'>
                        <h5>10:00 AM- 10:30AM</h5>
                        <div className='calendar_program_details_wrapper'>
                            <img src={img} />
                            <div className='calendar_program_name_wrapper'>
                                <h4>Program 1</h4>
                                <p>Bidisha Bhowmick</p>
                            </div>
                        </div>
                        <div className='calendar_program_links disable'>
                            <p style={{
                                cursor:'pointer'
                            }} onClick={(()=>{setfeedBackModal(true)})}>Add Review</p>
                            <h6>Link to join</h6>
                            <img src={disableLink} />
                        </div>
                    </div>

                    <div className='calendar_program'>
                        <h5>10:00 AM- 10:30AM</h5>
                        <div className='calendar_program_details_wrapper'>
                            <img src={img} />
                            <div className='calendar_program_name_wrapper'>
                                <h4>Program 1</h4>
                                <p>Bidisha Bhowmick</p>
                            </div>
                        </div>
                        <div className='calendar_program_links '>
                            <p>Add Review</p>
                            <h6 onClick={(() => navigate('/dashboard/programs/live-programs/1'))}>Link to join</h6>
                            <img onClick={(() => navigate('/dashboard/programs/live-programs/1'))} src={link} />
                        </div>
                    </div>

                    <div className='calendar_program'>
                        <h5>10:00 AM- 10:30AM</h5>
                        <div className='calendar_program_details_wrapper'>
                            <img src={img} />
                            <div className='calendar_program_name_wrapper'>
                                <h4>Program 1</h4>
                                <p>Bidisha Bhowmick</p>
                            </div>
                        </div>
                        <div className='calendar_program_links '>
                            <p>Add Review</p>
                            <h6 onClick={(() => navigate('/dashboard/programs/live-programs/1'))}>Link to join</h6>
                            <img onClick={(() => navigate('/dashboard/programs/live-programs/1'))} src={link} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CalendarDatesPrograms
