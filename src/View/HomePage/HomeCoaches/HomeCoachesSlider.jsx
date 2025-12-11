import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import img1 from '../../../assets/Images/9aa56766fc589aef71a434e396c3b39e7b53e210.jpg'
import img2 from '../../../assets/Images/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg'
import img3 from '../../../assets/Images/b2d6b1b6bfbe8f8f3eb5ef556d41129707d892e6.jpg'
import img4 from '../../../assets/Images/db2d1b05932154b8cb3e995a344ff87f52f104f6.jpg'
const HomeCoachesSlider = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
                responsive: [
            {
                breakpoint: 1099,
                settings: {
                    slidesToShow: 3,

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
            <div className='program_slider_wrapper'>
                <Slider {...settings}>
                    {SliderData.map((e, i) => (
                        <div className='program_slide home_coache_slide' key={i}>
                            <div className='home_coach_slide_content'>
                                <h5>{e.title}</h5>
                                <h6>{e.occupation}</h6>
                            </div>
                            <div className='overlay'></div>
                            <img src={e.img} alt='slider_img..' />
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    )
}

export default HomeCoachesSlider
