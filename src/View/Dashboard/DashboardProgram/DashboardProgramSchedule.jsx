import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import arrow from '../../../assets/Images/Vector (4).svg'
import img from '../../../assets/Images/Capa_1 (1).svg'
import FeedBackModal from './FeedBackModal'
const DashboardProgramSchedule = () => {
  const [modal, setModal] = useState(false);
  const { id } = useParams()
  const navigate = useNavigate()
  return (
    <>
      {modal && <FeedBackModal modal={modal} setModal={setModal} />}
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
              {id == 1 ? <p className='booked_class'>Booked</p> : <p style={{
                background: 'rgba(36, 159, 50, 1)'
              }}>Completed</p>}
              <img src={img} />
              <h6>Session 1 </h6>
              <span>25/05/2025: 09:30 PM</span>
              {id == 1 && <small onClick={(() => navigate('/dashboard/programs/session/2'))}>Reschedule</small>}
              {id == 1 && <small onClick={(() => navigate('/dashboard/programs/live-programs/1'))}>Join Now</small>}

            </div>



            <div className='all_program_card'>
              {id == 1 ? <p>Pending</p> : <p style={{
                background: 'rgba(36, 159, 50, 1)'
              }}>Completed</p>}
              <img src={img} />
              <h6>Session 2 </h6>
              {id == 2 && <span>25/05/2025: 09:30 PM</span>}
              {id == 1 && <small onClick={(() => navigate('/dashboard/programs/session/2'))}>Select Time slots</small>}
            </div>



            <div className='all_program_card'>
              {id == 1 ? <p>Pending</p> : <p style={{
                background: 'rgba(36, 159, 50, 1)'
              }}>Completed</p>}
              <img src={img} />
              <h6>Session 3 </h6>
              {id == 2 && <span>25/05/2025: 09:30 PM</span>}

              {id == 1 && <small onClick={(() => navigate('/dashboard/programs/session/2'))}>Select Time slots</small>}
            </div>


            <div className='all_program_card'>
              {id == 1 ? <p>Pending</p> : <p style={{
                background: 'rgba(36, 159, 50, 1)'
              }}>Completed</p>}
              <img src={img} />
              <h6>Session 4 </h6>
              {id == 2 && <span>25/05/2025: 09:30 PM</span>}

              {id == 1 && <small onClick={(() => navigate('/dashboard/programs/session/2'))}>Select Time slots</small>}
            </div>

          </div>
        </div>

        <div className='cancel_program_wrapper'>
          {id != 2 ? <>
            <button className='cancel_btn'>Cancel Program</button>
            <button className='dispute_btn'>Raise a dispute</button>
          </> :
            <>
              <button onClick={(() => setModal(true))} className='dispute_btn'>Write a review</button>
            </>}
        </div>
      </div>
    </>
  )
}

export default DashboardProgramSchedule
