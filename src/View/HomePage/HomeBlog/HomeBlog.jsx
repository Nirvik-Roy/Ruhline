import React from 'react'
import './HomeBlog.css'
import HomeBlogSlider from './HomeBlogSlider'
const HomeBlog = () => {
    return (
        <>
            <div className='home_blog_wrapper'>
                <div className='home_blog_content_wrapper all_Container'>
                    <h2 className='all_heading'>Our Blogs</h2>
                    <h1 className='all_heading2'>Articles</h1>
                    <HomeBlogSlider />
                </div>

            </div>
        </>
    )
}

export default HomeBlog
