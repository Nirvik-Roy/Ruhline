import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import img1 from '../../../assets/Images/Group 1597882920.svg'
import img2 from '../../../assets/Images/Group 1597882923.svg'
import img3 from '../../../assets/Images/Group 1597882922.svg'
const HomeProgramSlider = () => {
    const SliderData = [
        {
            isBestSelling: true,
            img: img1,
            details:"<b>Your Personal Roadmap</b> Define what success looks like for you. Through structured one-on-one sessions, we help you set meaningful goals, remove what's blocking you, and map a clear path forward.."
        },
        {
            isBestSelling: true,
            img: img2,
            details:"<b>Breathwork</b> Guided breathing techniques to reduce stress, regulate your nervous system, and return to calm — wherever you are.,"
        },
        {
            isBestSelling: false,
            img: img3,
            details:"<b>Yoga Sessions</b> Live, personal yoga classes tailored to your level and goals. No commute. No crowded studios. Just you and your instructor."
        },
        {
            isBestSelling: true,
            img: img1,
            details:"<b>Accountability Program</b> Weekly check-ins and habit tracking to keep you aligned with the goals you set — with a real person holding space for your growth."
        },
        {
            isBestSelling: true,
            img: img2,
            details:"<b>Wellness Referrals</b> Trusted connections to personal trainers and nutritionists, curated to complement your Ruhline journey."
        },
    ]
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
                breakpoint: 1299,
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
    return (
        <>
            <div className='program_slider_wrapper'>
                <Slider {...settings}>
                    {SliderData.map((e, i) => (
                        <div className='program_slide' key={i}>
                            {e.isBestSelling && <p>Best Selling</p>}
                            <h4 dangerouslySetInnerHTML={{__html:e?.details}} style={{
                                zIndex: '99',
                                fontSize:'14px'
                            }}></h4>
                            <img src={e.img} alt='slider_img..' />
                            <div className='overlay' style={{
                                background: 'linear-gradient(to bottom,rgba(0, 0, 0, 0.23), #00000026)'
                            }}></div>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    )
}

export default HomeProgramSlider
