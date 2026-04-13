import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import arrow from '../../../assets/Images/Vector (4).svg'
import img from '../../../assets/Images/Capa_1 (1).svg'
import FeedBackModal from './FeedBackModal'
import { deleteProgramReviews, getProgramEnrollmentsById, getProgramReviews } from '../../../utils/program'
import Loaders from '../../../Components/Loaders/Loaders'
import { Rating } from 'react-simple-star-rating'
import ReviewCard from '../../OneTimeService/ReviewCard'
import DeleteModal from '../../../Components/DeleteModal/DeleteModal'
const DashboardProgramSchedule = () => {
  const [modal, setModal] = useState(false);
  const [singleProgramSessions, setsingleProgramSessions] = useState([]);
  const [sessionDetails,setsessionDetails]= useState()
  const [loading, setloading] = useState()
  const { id, programId } = useParams();
  const [reviewsData, setreviewsData] = useState([])
  const navigate = useNavigate()
  const [enrollmentStatus, setenrollmentStatus] = useState('');
  const [editId, seteditId] = useState()
  const [edit, setedit] = useState(false)
  const [deleteId, setdeleteId] = useState()
  const [deleteModal, setdeleteModal] = useState(false)
  const fetchEnrollmentById = async () => {
    setloading(true)
    const res = await getProgramEnrollmentsById(id)
    if (res?.success) {
      setsingleProgramSessions(res?.data?.sessions)
      setsessionDetails(res?.data)
      setenrollmentStatus(res?.data?.enrollment_status)
    }
    setloading(false)
  }


  const fetchReviews = async () => {
    setloading(true)
    const res = await getProgramReviews()
    if (res?.success) {
      setreviewsData(res?.data?.data?.filter((e) => e.program_enrollment_id == id))
    }
    setloading(false)
  }

  useEffect(() => {
    fetchReviews()
  }, [])
  useEffect(() => {
    if (id) {
      fetchEnrollmentById()
    }
  }, [id])


  const handleDelete = async () => {
    setloading(true)
    const res = await deleteProgramReviews(deleteId)
    if (res?.success) {
      fetchReviews()
      setdeleteModal(false)
    }
    setloading(false)
  }
  return (
    <>
      {deleteModal && <DeleteModal onClick={handleDelete} title={'Delete review'} setdeleteModal={setdeleteModal} details={'Do you really want to delete this review?'} />}
      {modal && <FeedBackModal setedit={setedit} isEdit={edit} editId={editId} reviewsData={reviewsData} fetchReviews={fetchReviews} id={id} modal={modal} setModal={setModal} />}
      {loading && <Loaders />}
      <div className='dashboard_content_wrapper'>
        <div className='schedule_program_head_wrapper'>
          <div className='schedule_program_back_wrapper'>
            <img onClick={(() => navigate(-1))} src={arrow} />
            <div className='schedule_program_head'>
              <h3>{sessionDetails?.program?.name}</h3>
              <p><span>Facilitator name:</span> {sessionDetails?.coach?.name}</p>
            </div>
          </div>
          <Link to={'/dashboard/purchase'}>View order details</Link>
        </div>

        <div className='program_schdule_wrapper'>
          <h3>Program Schedule</h3>
          <div className='program_schedule_grid_wrapper'>
            {singleProgramSessions?.length <= 0 && <p style={{
              color: 'var(--primary-color)',
              fontWeight: '600',
              textAlign: 'center',
              gridColumn: '1/-1'
            }}>No sessions available...</p>}
            {singleProgramSessions?.map((e) => (
              <div className='all_program_card'>
                <p style={e?.session_ui_phase == 'upcoming' ? {
                  textTransform: 'capitalize',
                  background: 'rgba(224, 173, 34, 1)'
                } : e?.session_ui_phase == 'ongoing' ? {
                  textTransform: 'capitalize',
                  background: 'rgba(224, 173, 34, 1)'
                } : e?.session_ui_phase == 'pending_booking' ? {
                  background: 'red',
                  textTransform: 'capitalize',
                } : e?.session_ui_phase == 'cancelled' ? {
                  background: 'red',
                  textTransform: 'capitalize',
                } : e?.session_ui_phase == 'expired' ? {
                  background: 'red',
                  textTransform: 'capitalize',
                } : {
                  background: 'green'
                }}>{e?.session_ui_phase}</p>
                <img src={img} />
                <h6>Session {e?.session_number}</h6>
                {e?.start_at && <span>{new Date(e?.start_at).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  timeZone:'utc'
                })}</span>}
                {e?.can_reschedule && <small onClick={(() => navigate(`/dashboard/programs/session/${programId}/${id}/${e?.id}?session=Session ${e?.session_number}`))}>Reschedule</small>}

                {e?.can_schedule && <small onClick={(() => navigate(`/dashboard/programs/session/${programId}/${id}/${e?.id}?session=Session ${e?.session_number}`))}>Schedule</small>}
                {e?.join_now_url && <small onClick={(() => navigate(e?.join_now_url))}>Join Now</small>}
              </div>
            ))}

          </div>
        </div>

        <div className='cancel_program_wrapper'>
          {enrollmentStatus != 'completed' ? <>
            <button className='cancel_btn'>Cancel Program</button>
            <button className='dispute_btn' onClick={(() => navigate('/dashboard/support'))}>Raise a dispute</button>
          </> :
            <>
              <button style={reviewsData?.length > 0 ?{
                display:'none'
              }:{}} onClick={(() => setModal(true))} className='dispute_btn'>Write a review</button>
            </>}
        </div>

        {reviewsData?.length > 0 && <div style={{
          margin: '20px'
        }}>
          {reviewsData?.map((e) => (
            <ReviewCard onEdit={(() => {
              setedit(true)
              setModal(true)
              seteditId(e?.id)
            })}

              onDelete={(() => {
                setdeleteId(e?.id)
                setdeleteModal(true)

              })} isedit={true} value={e?.rating} isDelete={true} date={new Date(e?.created_at).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })} key={e?.id} description={e?.body} />
          ))}
        </div>}
      </div>
    </>
  )
}

export default DashboardProgramSchedule
