import React from 'react'
import img1 from '../../../assets/Images/image (1).svg'
import img2 from '../../../assets/Images/image (2).svg'
import img3 from '../../../assets/Images/image (3).svg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import { useNavigate } from 'react-router-dom';
import TimeAgo from 'react-timeago';
const HomeBlogSlider = ({ data }) => {
    const navigate = useNavigate()
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 899,
                settings: {
                    slidesToShow: 2,

                }
            },
            {
                breakpoint: 599,
                settings: {
                    slidesToShow: 1,

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
            category: 'Yoga',
            title: 'How Yoga is useful',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
            time: '10 Days ago',
            img: img1
        },
        {
            category: 'Life Coaching',
            title: 'How Yoga is useful',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
            img: img2,
            time: '10 Days ago',
        },
        {
            category: 'Yoga',
            title: 'How Yoga is useful',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
            img: img3,
            time: '10 Days ago',
        },
        {
            category: 'Yoga',
            title: 'How Yoga is useful',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
            time: '10 Days ago',
            img: img1
        },
        {
            category: 'Life Coaching',
            title: 'How Yoga is useful',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
            img: img2,
            time: '10 Days ago',
        },
        {
            category: 'Yoga',
            title: 'How Yoga is useful',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
            img: img3,
            time: '10 Days ago',
        },


    ]

    console.log(data)
    return (
        <>
            <div className='home_blog_slider_wrapper'>
                <Slider {...settings}>
                    { data?.map((e) => (
                     <div onClick={(() => navigate(`/single-articles/${e?.id}`))} className='home_blog_slide'>
                            <img src={e?.thumbnail_image} />
                            <div className='category_wrapper'>
                                <p>{e?.article_category?.name}</p>
                                <span>  <TimeAgo date={e?.created_at} />
                                </span>
                            </div>
                            <h3>{e?.name}</h3>
                            <p>{e?.description}</p>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    )
}

export default HomeBlogSlider
