import React, { useRef, useState } from "react";
import "./DashboardHabit.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const HabitCalendar = () => {
    const calendarRef = useRef(null);
    const [currentTitle, setCurrentTitle] = useState("January 2026");
    const events = [
        { title: "Habit 1", date: "2026-01-03", className: "hcalx91_evt_not_complete" },
        { title: "Habit 1", date: "2026-01-05", className: "hcalx91_evt_completed" },
        { title: "Habit 1", date: "2026-01-06", className: "hcalx91_evt_completed" },
        { title: "Habit 1", date: "2026-01-08", className: "hcalx91_evt_partial" },
        { title: "Habit 1", date: "2026-01-10", className: "hcalx91_evt_partial" },
        { title: "Habit 1", date: "2026-01-12", className: "hcalx91_evt_completed" },
        { title: "Habit 1", date: "2026-01-13", className: "hcalx91_evt_upcoming" },
        { title: "Habit 1", date: "2026-01-15", className: "hcalx91_evt_upcoming" },
        { title: "Habit 1", date: "2026-01-17", className: "hcalx91_evt_upcoming" },
        { title: "Habit 1", date: "2026-01-19", className: "hcalx91_evt_upcoming" },
        { title: "Habit 1", date: "2026-01-20", className: "hcalx91_evt_upcoming" },
        { title: "Habit 1", date: "2026-01-22", className: "hcalx91_evt_upcoming" },
        { title: "Habit 1", date: "2026-01-24", className: "hcalx91_evt_upcoming" },
        { title: "Habit 1", date: "2026-01-26", className: "hcalx91_evt_upcoming" },
        { title: "Habit 1", date: "2026-01-27", className: "hcalx91_evt_upcoming" },
        { title: "Habit 1", date: "2026-01-29", className: "hcalx91_evt_upcoming" },
    ];

    const handlePrev = () => {
        const api = calendarRef.current.getApi();
        api.prev();
        setCurrentTitle(api.view.title);
    };

    const handleNext = () => {
        const api = calendarRef.current.getApi();
        api.next();
        setCurrentTitle(api.view.title);
    };

    const handleDatesSet = (arg) => {
        setCurrentTitle(arg.view.title);
    };

    return (
        <section className="hcalx91_calendar_page_shell">
            <div className="hcalx91_calendar_card_wrap">
                <div className="hcalx91_calendar_topbar">
                    <div className="hcalx91_calendar_legend_wrap">
                        <div className="hcalx91_legend_item">
                            <span className="hcalx91_legend_color hcalx91_legend_upcoming"></span>
                            <span>Upcoming</span>
                        </div>

                        <div className="hcalx91_legend_item">
                            <span className="hcalx91_legend_color hcalx91_legend_completed"></span>
                            <span>Completed</span>
                        </div>

                        <div className="hcalx91_legend_item">
                            <span className="hcalx91_legend_color hcalx91_legend_partial"></span>
                            <span>Partially Complete</span>
                        </div>

                        <div className="hcalx91_legend_item">
                            <span className="hcalx91_legend_color hcalx91_legend_not_complete"></span>
                            <span>Not Complete</span>
                        </div>
                    </div>
                </div>

                <div className="hcalx91_calendar_header_nav">
                    <button className="hcalx91_nav_btn_circle" onClick={handlePrev}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>

                    <h2 className="hcalx91_calendar_title">{currentTitle}</h2>

                    <button className="hcalx91_nav_btn_circle" onClick={handleNext}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>

                <div className="hcalx91_calendar_main_wrap">
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        initialDate="2026-01-01"
                        headerToolbar={false}
                        fixedWeekCount={false}
                        showNonCurrentDates={true}
                        dayMaxEvents={false}
                        events={events}
                        datesSet={handleDatesSet}
                    />
                </div>
            </div>
        </section>
    );
};

export default HabitCalendar;