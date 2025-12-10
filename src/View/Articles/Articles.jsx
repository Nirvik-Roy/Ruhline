import React from 'react'
import './Articles.css'
import BannerLayout from '../BannerLayout/BannerLayout'
import img1 from '../../assets/Images/image (28).png'
import img2 from '../../assets/Images/image (30).png'
import img3 from '../../assets/Images/image (31).png'
import Pagination from '../../Components/Pagination/Pagination'
const Articles = () => {
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
            title: 'How Life Coaching is useful',
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
            title: 'How Life Coaching is useful',
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
            <BannerLayout title={'Articles'} />
            <div className='articles_wrapper'>
                <div className='articles_content_wrapper all_Container'>
                    {SliderData.map((e, i) => (

                        <div className='home_blog_slide'>
                            <img src={e.img} />
                            <div className='category_wrapper'>
                                <p>{e.category}</p>
                                <span>{e.time}</span>
                            </div>
                            <h3>{e.title}</h3>
                            <p>{e.details}</p>
                        </div>
                    ))}
                </div>

              <Pagination/>
            </div>
        </>
    )
}

export default Articles
