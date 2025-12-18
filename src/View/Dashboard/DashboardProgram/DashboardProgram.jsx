import React, { useState } from 'react'
import './DashboardProgram.css'
import AllPrograms from './AllPrograms'
import RecurringPrograms from './RecurringPrograms'
import DashboardOneTimePrograms from './DashboardOneTimePrograms'
const DashboardProgram = () => {
    const [toggle, setToggle] = useState({
        toggle1: true,
        toggle2: false,
        toggle3: false
    })
    const toggleFunction = (i) => {
        setToggle({
            toggle1: i === 1 && true,
            toggle2: i === 2 && true,
            toggle3: i === 3 && true,
        })
    }
    return (
        <>
            <div className='dashboard_content_wrapper'>
                <h3>Programs</h3>
                <hr style={{
                    color: 'rgba(217, 217, 217, 1)',
                    marginTop: '30px'
                }} />

                <div className='dasboard_programs_tabs_wrapper'>
                    <p className={toggle.toggle1 && 'active'} onClick={(() => toggleFunction(1))}>All Programs</p>
                    <p className={toggle.toggle2 && 'active'} onClick={(() => toggleFunction(2))}>Recurring</p>
                    <p className={toggle.toggle3 && 'active'} onClick={(() => toggleFunction(3))}>One-time</p>
                </div>

                {toggle.toggle1 && <AllPrograms/>}
                {toggle.toggle2 && <RecurringPrograms/>}
                {toggle.toggle3 && <DashboardOneTimePrograms/>}
            </div>
        </>
    )
}

export default DashboardProgram
