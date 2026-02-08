import React, { useState, useEffect } from 'react'
import './HomeBlog.css'
import HomeBlogSlider from './HomeBlogSlider'
import { getAllCmsData } from '../../../utils/cms'
import Loaders from '../../../Components/Loaders/Loaders'
const HomeBlog = ({ data }) => {
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
    return (
        <>
            {loading && <Loaders />}
            {<div className='home_blog_wrapper'>
                <div className='home_blog_content_wrapper all_Container'>
                    <h2 className='all_heading' dangerouslySetInnerHTML={{
                        __html: data?.headline || "Our Blogs"
                    }}></h2>
                    <h1 className='all_heading2' dangerouslySetInnerHTML={{
                        __html: data?.secondary_headline || "Articles"
                    }}></h1>
                    <HomeBlogSlider data={articleData} />
                </div>
                {articleData?.length <=0 && <p style={{
                    textAlign:'center',
                    color:'var(--primary-color)',
                    fontWeight:'600'
                }}>No articles are available...</p>}
            </div>}
        </>
    )
}

export default HomeBlog
