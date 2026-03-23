import React from 'react'
import HabitCalendar from './HabitCalendar'

const DashboardHabit = () => {
  return (
    <>
          <div className='dashboard_content_wrapper'>
              <h3>Habits</h3>
              <hr style={{
                  color: 'rgba(217, 217, 217, 1)',
                  marginTop: '30px'
              }} />
              <HabitCalendar/>
          </div>
    </>
  )
}

export default DashboardHabit
