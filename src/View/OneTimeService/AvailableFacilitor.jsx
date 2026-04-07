import React, { useEffect, useState } from 'react'
import BannerLayout from '../BannerLayout/BannerLayout'
import img1 from '../../assets/Images/pngtree-default-avatar-profile-icon-gray-placeholder-vector-png-image_16213764.png'
import Button from '../../Components/Button/Button.jsx'
import Slider from 'react-slick'
import { useNavigate, useParams } from 'react-router-dom'
import { getProgamSpecificCoaches } from '../../utils/coach.js'
import Loaders from '../../Components/Loaders/Loaders.jsx'
import toast from 'react-hot-toast'
const AvailableFacilitor = () => {
    const [selectedIndex, setselectedIndex] = useState();
    const navigate = useNavigate();
    const { id } = useParams()
    const [coachesData, setcoachesData] = useState([]);
    const [loading, setloading] = useState('');
    const [selectedCoachid, setselectedCoachId] = useState()
    const [toggle, setToggle] = useState({
        toggle1: false,
        toggle2: true,
        toggle3: false,
        toggle4: false,
    })
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: Math.min(coachesData?.length || 0, 5),
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1099,
                settings: {
                    slidesToShow: Math.min(coachesData?.length || 0, 4),

                }
            },
            {
                breakpoint: 899,
                settings: {
                    slidesToShow: Math.min(coachesData?.length || 0, 3),

                }
            },
            {
                breakpoint: 699,
                settings: {
                    slidesToShow: Math.min(coachesData?.length || 0, 2),

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: Math.min(coachesData?.length || 0, 1),

                }
            },
        ]
    };

    const getProgramSpecificCoachesFunc = async () => {
        setloading(true)
        const res = await getProgamSpecificCoaches(id)
        setcoachesData(res?.data)
        setloading(false)
    }

    useEffect(() => {
        getProgramSpecificCoachesFunc()
    }, [id])

    return (
        <>
            {loading && <Loaders />}
            <BannerLayout title={'Available Facilitator'} />
            <div className='available_facilitor_wrapper'>
                <div className='all_Container'>
                    <div className='available_tabs_wrapper'>
                        <p className='service_active' >All</p>
                        {/* <p className={toggle.toggle2 && 'service_active'}>Early Morning</p>
                        <p>Morning</p>
                        <p>Afternoon</p>
                        <p>Evening</p>
                        <p>Night</p> */}
                    </div>

                    <h3 className='select_head899'>Select Facilitator </h3>
                    <Slider {...settings}>
                        {coachesData?.map((e, i) => (
                            <div onClick={(() => {
                                setselectedCoachId(e?.id)
                                setselectedIndex(i)
                            })} className='program_slide available_slider' key={i}>
                                <div className='home_coach_slide_content' style={i == selectedIndex ? {
                                    width: '95%',
                                    left: '50%',
                                    bottom: '5px',
                                    transform: 'translateX(-50%)'
                                } : {
                                    left: '0',
                                    bottom: '-3.5px',
                                    width: '100%',
                                }}>
                                    <h5 style={i == selectedIndex ? {
                                        color: '#fff',
                                        width: '100%',
                                        background: 'rgba(0,0,0,0.3)',
                                        minWidth: '100%',
                                        padding: '20px 10px',
                                        fontWeight: '700',
                                        backdropFilter: 'blur(1px)',
                                        borderRadius: ' 0 0 5px 5px'
                                    } : {
                                        color: '#fff',
                                        width: '100%',
                                        background: 'rgba(0,0,0,0.3)',
                                        minWidth: '100%',
                                        padding: '20px 10px',
                                        fontWeight: '700',
                                        backdropFilter: 'blur(1px)',
                                        borderRadius: ' 0 0 10px 10px'


                                    }}>{e?.user?.name}</h5>
                                    {/* <h6>{e.occupation}</h6> */}
                                </div>
                                <div className='overlay' style={{
                                    borderRadius: '15px',
                                }}></div>
                                <img style={i == selectedIndex ? {
                                    border: '3px solid rgba(144, 155, 109, 1)',
                                    borderRadius: '15px',
                                    padding: '5px',
                                    position: 'relative',
                                    zIndex: '9'
                                } : {}} src={e?.profile?.profile_image || img1} alt='coach_img..' />
                            </div>
                        ))}
                    </Slider>
                    <div onClick={(() =>{
                        if(selectedCoachid){
                            navigate(`/service-date/${id}/${selectedCoachid}`)
                        }else{
                            toast.error('Plz select a coach before procceding..')
                        }
                    })}>
                        <Button children={'Next'} styles={{
                            marginLeft: 'auto',
                            padding: '8px 40px',
                            marginRight: '30px',
                            marginTop: '80px'
                        }} />
                    </div>

                </div>


            </div>
        </>
    )
}

export default AvailableFacilitor
