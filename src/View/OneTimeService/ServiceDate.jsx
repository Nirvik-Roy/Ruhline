import React from 'react'
import BannerLayout from '../BannerLayout/BannerLayout'
import img from '../../assets/Images/Frame 1984078589.svg'
import clock from '../../assets/Images/Vector (2).svg'
import video from '../../assets/Images/Vector (3).svg'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Button from '../../Components/Button/Button'
const ServiceDate = () => {
    return (
        <>
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
                        <Calendar className={'service_date_calendar'} />
                    </div>
                    <div className='service_date_right'>
                        <h3>Thursday, 10th December</h3>
                        <div>
                            <div className='time_gird_wrapper'>
                                <p>05:00am-05:30am</p>
                                <p>05:30am-06:00am</p>
                                <p>06:00am- 06:30am</p>
                                <p>06:30am- 07:00am</p>
                                <p>07:00am- 07:30am</p>
                                <p>07:30am- 08:00am</p>
                            </div>
                            <div className='cancel_select_button_wrapper'>

                            <button>Cancel</button>
                            <Button children={'Select'}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceDate
