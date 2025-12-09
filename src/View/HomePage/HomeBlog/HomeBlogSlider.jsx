import React from 'react'
import img1 from '../../../assets/Images/image (1).svg'
import img2 from '../../../assets/Images/image (2).svg'
import img3 from '../../../assets/Images/image (3).svg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
const HomeBlogSlider = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000
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
    return (
        <>
            <div className='home_blog_slider_wrapper'>
            <Slider {...settings}>

                {SliderData.map((e, i) => (
       
                    <div className='home_blog_slide'>
                        <img src={e.img}/>
                        <div className='category_wrapper'>
                            <p>{e.category}</p>
                            <span>{e.time}</span>
                        </div>
                        <h3>{e.title}</h3>
                        <p>{e.details}</p>
                    </div>
                ))}
            </Slider>
            </div>
        </>
    )
}

export default HomeBlogSlider
