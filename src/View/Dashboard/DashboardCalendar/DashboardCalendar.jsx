import React, { useRef, useState } from "react";
import arrow from '../../../assets/Images/Vector (4).svg'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import './DashboardCalendar.css'
const DashboardCalendar = () => {
    const calendarComponentRef = useRef(null);

    const [events, setEvents] = useState([

    ]);
    const handleSelectedDates = (info) => {
        alert("You Selected " + info.startStr);
        const title = prompt("Add your schedule timings");
        if (title != null && title != "") {
            const newEvent = {
                title,
                start: info.startStr,
                // end: info.endStr
            };
            setEvents((prevEvents) => [...prevEvents, newEvent]);
        } else {
            return null;
        }
    };
    return (
        <>
            <div className="dashboard_content_wrapper">
                <div className='schedule_program_head_wrapper' style={{
                    marginBottom: '30px'
                }}>
                    <div className='schedule_program_back_wrapper'>
                        <img src={arrow} />
                        <div className='schedule_program_head'>
                            <h3>Calendar</h3>

                        </div>
                    </div>

                </div>
                <FullCalendar
                    schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                    ref={calendarComponentRef}

                    // dateClick={handleDateClick}
                    displayEventTime={true}
                    selectable={true}        // allow clicking/selecting
                    selectMirror={true}

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
                    select={handleSelectedDates}

                />
            </div>
        </>
    )
}

export default DashboardCalendar
