import React, { useEffect, useState } from 'react'
import './Articles.css'
import BannerLayout from '../BannerLayout/BannerLayout'
import img1 from '../../assets/Images/image (28).png'
import img2 from '../../assets/Images/image (30).png'
import img3 from '../../assets/Images/image (31).png'
import Pagination from '../../Components/Pagination/Pagination'
import { useNavigate } from 'react-router-dom'
import { getAllCmsData } from '../../utils/cms'
import Loaders from '../../Components/Loaders/Loaders'
import TimeAgo from 'react-timeago'
const Articles = () => {
    const navigate = useNavigate()
    const [loading, setloading] = useState(false);
    const [articleData, setarticleData] = useState()
    const fetchData = async () => {
        try {
            setloading(true);
            const res = await getAllCmsData('/article/article');
            console.log(res)
            setarticleData(res?.data?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    const SliderData = [
        {
            id: 1,
            category: 'Yoga',
            title: 'How Yoga is useful',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
            time: '10 Days ago',
            img: img1
        },
        {
            id: 2,
            category: 'Life Coaching',
            title: 'How Life Coaching is useful',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
            img: img2,
            time: '10 Days ago',
        },
        {
            id: 3,
            category: 'Yoga',
            title: 'How Yoga is useful',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
            img: img3,
            time: '10 Days ago',
        },
        {
            id: 4,
            category: 'Yoga',
            title: 'How Yoga is useful',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
            time: '10 Days ago',
            img: img1
        },
        {
            id: 5,
            category: 'Life Coaching',
            title: 'How Life Coaching is useful',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
            img: img2,
            time: '10 Days ago',
        },
        {
            id: 6,
            category: 'Yoga',
            title: 'How Yoga is useful',
            details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
            img: img3,
            time: '10 Days ago',
        },


    ]
    return (
        <>
            {loading && <Loaders />}
            <BannerLayout title={'Articles'} />
            <div className='articles_wrapper'>
                <div className='articles_content_wrapper all_Container'>
                    {articleData?.map((e) => (
                        <div onClick={(() => navigate(`/single-articles/${e?.id}`))} className='home_blog_slide'>
                            <img src={e?.thumbnail_image} />
                            <div className='category_wrapper'>
                                <p>{e?.article_category.name}</p>
                                <span><TimeAgo date={e?.created_at} /></span>
                            </div>
                            <h3>{e?.name}</h3>
                            <p>{e?.description}</p>
                        </div>
                    ))}
                </div>
                
                {articleData?.length > 6 && <Pagination />}
                {articleData?.length <=0 && <p style={{
                    textAlign:'center',
                    color:'var(--primary-color)',
                    fontWeight:'600'
                }}>No articles available...</p>}
            </div>
        </>
    )
}

export default Articles
