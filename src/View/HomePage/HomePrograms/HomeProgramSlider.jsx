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
            img: img1
        },
        {
            isBestSelling: true,
            img: img2
        },
        {
            isBestSelling: false,
            img: img3
        },
        {
            isBestSelling: true,
            img: img1
        },
        {
            isBestSelling: true,
            img: img2
        },
        {
            isBestSelling: false,
            img: img3
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
                            <h4 style={{
                                zIndex: '99'
                            }}>Program {i + 1}</h4>
                            <img src={e.img} alt='slider_img..' />
                            <div className='overlay'></div>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    )
}

export default HomeProgramSlider
