import React, { useEffect, useState } from 'react'
import img from '../../../assets/Images/Frame 1984078589.svg'
import clock from '../../../assets/Images/Vector (2).svg'
import video from '../../../assets/Images/Vector (3).svg'
import arrow from '../../../assets/Images/Vector (4).svg'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Button from '../../../Components/Button/Button'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getEnrollmentSlots, getSingleProgram, getProgramEnrollmentsById, rescheduleProgramApi, scheduleProgramApi } from '../../../utils/program'
import Loaders from '../../../Components/Loaders/Loaders'
import toast from 'react-hot-toast'
import DashboardLoader from '../../../Components/Loaders/DashboardLoader'
const DashboardSession = () => {
    const { enrollmentId, sessionId, programId } = useParams()
    const [timeData, settitmeData] = useState('')
    const [loading, setloading] = useState();
    const [postLoading, setpostLoading] = useState(false)
    const [date, setDate] = useState('');
    const [slotsData, setslotsData] = useState([])
    const [slotsStartDate, setslotsStartDate] = useState('');
    const [singleProgram, setsingleProgram] = useState({});
    const [singleSessionDetails, setsingleSessionDetails] = useState({})
    const [searchParams, setSearchParams] = useSearchParams();
    const [coachData, setCoachData] = useState({});
    const [slotsLoading, setslotsLoading] = useState(false)
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const [active, setActive] = useState()
    const navigate = useNavigate()

    const getSlots = async () => {
        setslotsLoading(true)
        const res = await getEnrollmentSlots(enrollmentId, sessionId, date)
        setslotsData(res)
        setslotsLoading(false)
    }

    useEffect(() => {
        if (sessionId && enrollmentId && date) {
            getSlots()
        }
    }, [sessionId, enrollmentId, date])


    const getSingleProgramFunc = async () => {
        setloading(true)
        const res = await getSingleProgram(programId)
        setsingleProgram(res)
        setloading(false)
    }

    useEffect(() => {
        if (programId) {
            getSingleProgramFunc()
        }
    }, [programId])


    const fetchEnrollmentById = async () => {
        setloading(true)
        const res = await getProgramEnrollmentsById(enrollmentId)
        if (res?.success) {
            setCoachData(res?.data?.coach)
            setsingleSessionDetails(res?.data?.sessions?.filter((e) => e.id == sessionId))
        }
        setloading(false)
    }

    useEffect(() => {
        if (enrollmentId) {
            fetchEnrollmentById()
        }
    }, [enrollmentId])


    const rescheduleProgramFunc = async () => {
        if (slotsStartDate) {
            setpostLoading(true)
            const res = await rescheduleProgramApi({
                slot_start_at: slotsStartDate
            }, enrollmentId, sessionId)
            if (res?.success) {
                navigate(-1)
            }
            setpostLoading(false)
        } else {
            toast.error('Please select a slot...')
            setpostLoading(false)
        }
    }


    const scheduleProgramFunc = async () => {
        if (slotsStartDate) {
            setpostLoading(true)
            const res = await scheduleProgramApi({
                slot_start_at: slotsStartDate
            }, enrollmentId, sessionId)
            if (res?.success) {
                navigate(-1)
            }
            setpostLoading(false)
        } else {
            toast.error('Please select a slot...')
            setpostLoading(false)
        }
    }

    return (
        <>
            <div className='dashboard_content_wrapper'>
                {loading && <DashboardLoader />}
                {!loading && <div className='dashboard_session_wrapper'>
                    <div className='service_date_left dashboard_session_left'>

                        <div className='service_arrow_wrapper'>
                            <img src={arrow} onClick={(() => navigate(-1))} />
                            <h4>{searchParams.get('session')}</h4>
                        </div>
                        {singleProgram?.occurrence_type == 'recurring' && <p style={{
                            fontWeight: '700',
                            color: 'var(-text-color)'
                        }}>Schedule your first session</p>}
                        <div className='service_date_img'>
                            <img src={coachData?.profile_image || img} />
                            <p>{coachData?.name}</p>
                        </div>
                        {singleProgram?.sessions_per_week && <p style={{
                            fontSize: '15px'
                        }}>Total sessions per week : <span style={{
                            color: 'var(--text-color)',
                            fontWeight: '700'
                        }}>{singleProgram?.sessions_per_week}</span></p>}
                        <div className='service_date_img'>
                            <img src={clock} style={{
                                width: '22px',
                                borderRadius: '0'
                            }} />
                            <p>{singleProgram?.session_duration_minutes} mins</p>
                        </div>

                        <div className='service_date_img'>
                            <img src={video} style={{
                                width: '22px',
                                borderRadius: '0'

                            }} />
                            <p>{singleProgram?.name}</p>
                        </div>

                    </div>
                    <div className='dashboard_session_right'>

                        <Calendar onChange={(e) => {
                            settitmeData(e.toDateString())
                            setDate(formatDate(e))
                        }} className={'service_date_calendar'} />
                        {slotsLoading && <div style={{
                            height: '50vh',
                            position: 'relative'
                        }}>
                            <DashboardLoader />
                        </div>}
                        {!slotsLoading && <>
                            {timeData && <h4>{timeData}</h4>}
                            <div className='time_gird_wrapper'>
                                {slotsData?.slots?.length <= 0 && <p>No slots are available right now...</p>}
                                {slotsData?.slots?.map((element, index) => {
                                    return (
                                        <>
                                            <p onClick={(() => {
                                                setslotsStartDate(element?.start_at)
                                                setActive(index)
                                            })} style={active === index ? {
                                                background: 'rgba(144, 155, 109, 1)',
                                                color: "#fff"
                                            } : {}}>{element?.label}</p>
                                        </>
                                    )
                                })}
                            </div>

                            <div className='cancel_select_button_wrapper'>

                                <button>Cancel</button>
                                <div onClick={singleSessionDetails?.can_reschedule ? rescheduleProgramFunc : scheduleProgramFunc}>
                                    <Button loading={postLoading} loadingText='Submitting...' styles={{
                                        background: 'var(--primary-color)'
                                    }} children={'Select'} />
                                </div>
                            </div>

                        </>}
                    </div>
                </div>}
            </div>
        </>
    )
}

export default DashboardSession
