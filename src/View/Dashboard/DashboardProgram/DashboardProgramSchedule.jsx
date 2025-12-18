import React from 'react'
import { Link } from 'react-router-dom'
import arrow from '../../../assets/Images/Vector (4).svg'
import img from '../../../assets/Images/Capa_1 (1).svg'
const DashboardProgramSchedule = () => {
  return (
    <>
      <div className='dashboard_content_wrapper'>
        <div className='schedule_program_head_wrapper'>
          <div className='schedule_program_back_wrapper'>
            <img src={arrow} />
            <div className='schedule_program_head'>
              <h3>Program 1</h3>
              <p><span>Facilitator name:</span> Bidisha Bhowmick</p>
            </div>
          </div>
          <Link>View order details</Link>
        </div>

        <div className='program_schdule_wrapper'>
          <h3>Program Schedule</h3>
          <div className='program_schedule_grid_wrapper'>
            <div className='all_program_card'>
              <p className='booked_class'>Booked</p>
              <img src={img} />
              <h6>Session 1 </h6>
              <span>25/05/2025: 09:30 PM</span>
              <small>Reschedule</small>
            </div>



            <div className='all_program_card'>
              <p>Pending</p>
              <img src={img} />
              <h6>Session 2 </h6>
              <small>Select Time slots</small>
            </div>



            <div className='all_program_card'>
              <p>Pending</p>
              <img src={img} />
              <h6>Session 3 </h6>
              <small>Select Time slots</small>
            </div>


            <div className='all_program_card'>
              <p>Pending</p>
              <img src={img} />
              <h6>Session 4 </h6>
              <small>Select Time slots</small>
            </div>

          </div>
        </div>

        <div className='cancel_program_wrapper'>
          <button>Cancel Program</button>
          <button>Raise a dispute</button>
        </div>
      </div>
    </>
  )
}

export default DashboardProgramSchedule
