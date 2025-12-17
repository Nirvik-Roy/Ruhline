import React, { use, useState } from 'react'
import BannerLayout from '../BannerLayout/BannerLayout'
import img1 from '../../assets/Images/9aa56766fc589aef71a434e396c3b39e7b53e210.jpg'
import img2 from '../../assets/Images/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg'
import img3 from '../../assets/Images/b2d6b1b6bfbe8f8f3eb5ef556d41129707d892e6.jpg'
import img4 from '../../assets/Images/db2d1b05932154b8cb3e995a344ff87f52f104f6.jpg'
import Button from '../../Components/Button/Button.jsx'
import Slider from 'react-slick'
const AvailableFacilitor = () => {
    const [selectedIndex, setselectedIndex] = useState()
    const [toggle, setToggle] = useState({
        toggle1: false,
        toggle2: true,
        toggle3: false,
        toggle4: false,
    })
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1099,
                settings: {
                    slidesToShow: 4,

                }
            },
            {
                breakpoint: 899,
                settings: {
                    slidesToShow: 3,

                }
            },
            {
                breakpoint: 699,
                settings: {
                    slidesToShow: 2,

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,

                }
            },
        ]
    };
    const SliderData = [
        {
            title: 'Olivia Bennett',
            occupation: 'Health Care Consultant',
            img: img1
        },
        {
            title: 'Olivia Bennett',
            occupation: 'Health Care Consultant',
            img: img2
        },
        {
            title: 'Olivia Bennett',
            occupation: 'Health Care Consultant',
            img: img1
        },
        {
            title: 'Olivia Bennett',
            occupation: 'Health Care Consultant',
            img: img3
        },
        {
            title: 'Olivia Bennett',
            occupation: 'Health Care Consultant',
            img: img1
        },
        {
            title: 'Olivia Bennett',
            occupation: 'Health Care Consultant',
            img: img2
        },
        {
            title: 'Olivia Bennett',
            occupation: 'Health Care Consultant',
            img: img2
        },
        {
            title: 'Olivia Bennett',
            occupation: 'Health Care Consultant',
            img: img3
        },
    ]
    return (
        <>
            <BannerLayout title={'Available Facilitator'} />
            <div className='available_facilitor_wrapper'>
                <div className='all_Container'>
                    <div className='available_tabs_wrapper'>
                        <p >All</p>
                        <p className={toggle.toggle2 && 'service_active'}>Early Morning</p>
                        <p>Morning</p>
                        <p>Afternoon</p>
                        <p>Evening</p>
                        <p>Night</p>
                    </div>

                    <h3 className='select_head899'>Select Facilitator </h3>
                    <Slider {...settings}>
                        {SliderData.map((e, i) => (
                            <div onClick={(() => setselectedIndex(i))} className='program_slide available_slider' key={i}>
                                <div className='home_coach_slide_content'>
                                    <h5>{e.title}</h5>
                                    <h6>{e.occupation}</h6>
                                </div>
                                <div className='overlay' style={{
                                    borderRadius:'15px'
                                }}></div>
                                <img style={i == selectedIndex ? {
                                    border: '3px solid rgba(144, 155, 109, 1)',
                                    borderRadius: '15px',
                                    padding: '5px',
                                    position: 'relative',
                                    zIndex: '9'
                                } : {}} src={e.img} alt='slider_img..' />
                            </div>
                        ))}
                    </Slider>

                    <Button children={'Next'} styles={{
                        marginLeft: 'auto',
                        padding: '8px 40px',
                        marginRight: '30px',
                        marginTop: '80px'
                    }} />
                </div>


            </div>
        </>
    )
}

export default AvailableFacilitor
