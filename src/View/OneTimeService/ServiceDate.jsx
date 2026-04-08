import React, { useEffect, useState } from 'react'
import BannerLayout from '../BannerLayout/BannerLayout'
import img from '../../assets/Images/Frame 1984078589.svg'
import clock from '../../assets/Images/Vector (2).svg'
import video from '../../assets/Images/Vector (3).svg'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Button from '../../Components/Button/Button'
import { useNavigate, useParams } from 'react-router-dom'
import Loaders from '../../Components/Loaders/Loaders'
import { getProgamCoachSlots } from '../../utils/coach'
import { getSingleProgram } from '../../utils/program'
import { postPreview } from '../../utils/payments'
import toast from 'react-hot-toast'
import RedirectingCheckoutModal from './RedirectingCheckoutModal'
const ServiceDate = () => {
    const [active, setActive] = useState()
    const navigate = useNavigate()
    const { id, coachId, coachName } = useParams()
    const [slotsData, setslotsData] = useState({});
    const [timeData, settitmeData] = useState('')
    const [slotsStartDate, setslotsStartDate] = useState('');
    const [singleProgram, setsingleProgram] = useState({})
    const [loading, setloading] = useState(false);
    const [previewLoading, setpreviewLoading] = useState(false)
    const [date, setDate] = useState('');

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const getSlots = async () => {
        setloading(true)
        const res = await getProgamCoachSlots(id, coachId, date)
        setslotsData(res)
        setloading(false)
    }

    const getSingleProgramFunc = async () => {
        setloading(true)
        const res = await getSingleProgram(id)
        setsingleProgram(res)
        setloading(false)
    }
    useEffect(() => {
        if (date && id && coachId) {
            getSlots()
        }
    }, [date, id, coachId])

    useEffect(() => {
        if (id) {
            getSingleProgramFunc()
        }
    }, [id])
    const appiledForPreview = async () => {
        if (slotsStartDate) {
            try {
                setpreviewLoading(true)
                const res = await postPreview({
                    program_id: id,
                    coach_id: coachId,
                    slot_start_at: slotsStartDate
                })
                if (res?.success) {
                    const encrypted = btoa(slotsStartDate);
                    navigate(`/confirm-booking/${id}/${coachId}/?slot=${encodeURIComponent(encrypted)}`)
                    const previewData = localStorage.getItem('previewData')
                    if (previewData) {
                        localStorage.removeItem('previewData')
                        localStorage.setItem('previewData', JSON.stringify(res?.data))
                    } else {
                        localStorage.setItem('previewData', JSON.stringify(res?.data))
                    }
                }
            } catch (err) {
                console.log(err)
            } finally {
                setpreviewLoading(false)
            }
        } else {
            toast.error('Plz select a slot...')
        }
    }
    return (
        <>
            {loading && <Loaders />}
            <BannerLayout title={'Select Date and Time'} />
            {previewLoading && <RedirectingCheckoutModal isOpen={true} />}
            <div className='service_date_wrapper'>
                <div className='all_Container service_content_date'>
                    <div className='service_date_left'>
                        <div className='service_date_img'>
                            <img src={img} />
                            <p>{coachName.trim()}</p>
                        </div>
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
                    <div className='service_date_center'>
                        <Calendar
                            onChange={(e) => {
                                settitmeData(e.toDateString())
                                setDate(formatDate(e))
                            }}
                            className={'service_date_calendar'}
                        />
                    </div>
                    <div className='service_date_right'>
                        {timeData && <h3>{timeData}</h3>}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            gap: '40px',
                            height: '38vh',
                        }}>
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
                                <div onClick={appiledForPreview}>
                                    <Button children={'Select'} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceDate
