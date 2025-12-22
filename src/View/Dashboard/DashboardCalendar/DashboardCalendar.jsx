import React, { useRef, useState } from "react";
import arrow from '../../../assets/Images/Vector (4).svg'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import './DashboardCalendar.css'
import { useNavigate } from "react-router-dom";
import FeedBackModal from "../DashboardProgram/FeedBackModal";
const DashboardCalendar = () => {
    const calendarComponentRef = useRef(null);
    const navigate = useNavigate();
    const [events, setEvents] = useState([
        {
            title: '9:00AM - 10:00AM',
            start: "2025-12-01"
        },
    ]);
    // const handleSelectedDates = (info) => {
    //     alert("You Selected " + info.startStr);
    //     const title = prompt("Add your schedule timings");
    //     if (title != null && title != "") {
    //         const newEvent = {
    //             title,
    //             start: info.startStr,
    //             // end: info.endStr
    //         };
    //         console.log(newEvent)
    //         setEvents((prevEvents) => [...prevEvents, newEvent]);
    //     } else {
    //         return null;
    //     }
    // };

    const handleNavigation = (info) => {
        if (events[0].start != info.dateStr) {
            return;
        } else {
            navigate(`/dashboard/calendar/programs/${info.dateStr}`)
        }
    }
    return (
        <>

            <div className="dashboard_content_wrapper">
                <div className='schedule_program_head_wrapper' style={{
                    marginBottom: '30px'
                }}>
                    <div className='schedule_program_back_wrapper'>
                        <img src={arrow} />
                        <div className='schedule_program_head'>
                            <h3 style={{
                                marginBottom:'0px'
                            }}>Calendar</h3>

                        </div>
                    </div>

                </div>
                <div className="claendar_wrappr553">
                      <FullCalendar
                    schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                    ref={calendarComponentRef}
                    
                    // dateClick={handleDateClick}
                    displayEventTime={true}
                    selectable={false}        // allow clicking/selecting
                    selectMirror={false}

                    selectAllow={(selectInfo) => {
                        // Only allow selection if it’s exactly one day
                        const ONE_DAY = 24 * 60 * 60 * 1000;
                        const diff = selectInfo.end.getTime() - selectInfo.start.getTime();
                        return diff === ONE_DAY;
                    }}
                    
                    plugins={[
                        dayGridPlugin,
                        interactionPlugin,
                        timeGridPlugin,
                        resourceTimeGridPlugin
                    ]}

                    eventClick={(event) => {
                        console.log(event.event._def.publicId);
                    }}
                    events={events}
                    dateClick={handleNavigation}
                // select={handleSelectedDates}

                />
                </div>
              
            </div>
        </>
    )
}

export default DashboardCalendar
