import React, { use, useEffect, useState } from 'react'
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
const ServiceDate = () => {
    const [active, setActive] = useState()
    const navigate = useNavigate()
    const { id, coachId } = useParams()
    const [slotsData, setslotsData] = useState([])
    const [loading, setloading] = useState(false);
    const [date,setDate] = useState('')

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const getSlots = async () => {
        setloading(true)
        const res = await getProgamCoachSlots(id, coachId,date)
        console.log(res)
        setloading(false)
    }
    useEffect(()=>{
       if(date && id && coachId){
        getSlots()
       }
    },[date,id,coachId])


    return (
        <>
            {loading && <Loaders />}
            <BannerLayout title={'Select Date and Time'} />
            <div className='service_date_wrapper'>
                <div className='all_Container service_content_date'>
                    <div className='service_date_left'>
                        <div className='service_date_img'>
                            <img src={img} />
                            <p>Olivia Bennett</p>
                        </div>
                        <div className='service_date_img'>
                            <img src={clock} style={{
                                width: '22px',
                                borderRadius: '0'
                            }} />
                            <p>30 mins</p>
                        </div>

                        <div className='service_date_img'>
                            <img src={video} style={{
                                width: '22px',
                                borderRadius: '0'
                            }} />
                            <p>Program 1</p>
                        </div>

                    </div>
                    <div className='service_date_center'>
                        <Calendar
                            onChange={(e) => setDate(formatDate(e))}
                            className={'service_date_calendar'}
                        />
                    </div>
                    <div className='service_date_right'>
                        <h3>Thursday, 10th December</h3>
                        <div>
                            <div className='time_gird_wrapper'>
                                <p onClick={(() => setActive(1))} style={active === 1 ? {
                                    background: 'rgba(144, 155, 109, 1)',
                                    color: "#fff"
                                } : {}}>05:00am-05:30am</p>
                                <p onClick={(() => setActive(2))} style={active === 2 ? {
                                    background: 'rgba(144, 155, 109, 1)',
                                    color: "#fff"
                                } : {}}>05:30am-06:00am</p>
                                <p onClick={(() => setActive(3))} style={active === 3 ? {
                                    background: 'rgba(144, 155, 109, 1)',
                                    color: "#fff"
                                } : {}}>06:00am- 06:30am</p>
                                <p onClick={(() => setActive(4))} style={active === 4 ? {
                                    background: 'rgba(144, 155, 109, 1)',
                                    color: "#fff"
                                } : {}}>06:30am- 07:00am</p>
                                <p onClick={(() => setActive(5))} style={active === 5 ? {
                                    background: 'rgba(144, 155, 109, 1)',
                                    color: "#fff"
                                } : {}}>07:00am- 07:30am</p>
                                <p onClick={(() => setActive(6))} style={active === 6 ? {
                                    background: 'rgba(144, 155, 109, 1)',
                                    color: "#fff"
                                } : {}}>07:30am- 08:00am</p>
                            </div>
                            <div className='cancel_select_button_wrapper'>

                                <button>Cancel</button>
                                <div onClick={(() => navigate('/confirm-booking'))}>

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
