import React, { useEffect, useState } from 'react'
import bigImg from '../../assets/Images/Rectangle 6737.png'
import BannerLayout from '../BannerLayout/BannerLayout'
import calendarLogo from '../../assets/Images/calendar_month.svg'
import smallImg from '../../assets/Images/Rectangle 6738.png'
import smallImg2 from '../../assets/Images/Rectangle 6739.png'
import checkIcon from '../../assets/Images/Vector (8).svg'
import searchIcon from '../../assets/Images/Search (1).svg'
import recentPosts from '../../assets/Images/image (2).png'
import Button from '../../Components/Button/Button.jsx'
import { getAllCmsData, getSingleCmsData } from '../../utils/cms'
import Loaders from '../../Components/Loaders/Loaders'
import { useNavigate, useParams } from 'react-router-dom'
import TimeAgo from 'react-timeago'
const SingleArticle = () => {
    const [loading, setloading] = useState(false);
    const navigate = useNavigate()
    const { id } = useParams()
    const [singleArticleData, setsingleArticleData] = useState();
    const [articleData, setarticleData] = useState()
    const fetchData = async () => {
        try {
            setloading(true);
            const res = await getSingleCmsData('/article/article', id);
            setsingleArticleData(res?.data)
            console.log(res?.data)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        if (id) {
            fetchData()
        }
    }, [id])


    const fetchAllArticles = async () => {
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
        fetchAllArticles()
    }, [])
    return (
        <>
            {loading && <Loaders />}
            <BannerLayout title={singleArticleData?.name} />
            <div className='single_article_wrapper'>
                <div className='all_Container single_article_content_wrapper'>
                    <div className='single_article_img_content'>
                        <img className='big_article_img' src={singleArticleData?.thumbnail_image} />
                        <div className='single_article_title_wrapper'>
                            <p style={{
                                background: '#fcf3ea'
                            }}>{singleArticleData?.article_category?.name}</p>
                            <div className='single_article_Date_Wrapper'>
                                <img src={calendarLogo} />
                                <p><TimeAgo date={singleArticleData?.created_at} /></p>
                            </div>
                        </div>

                        {singleArticleData?.sections?.length <= 0 && <h1>{singleArticleData?.name}</h1>}

                        {singleArticleData?.sections?.length <= 0 && <p>{singleArticleData?.description}</p>}

                        {singleArticleData?.sections?.map((e) => (
                            <>
                                {e?.image && <div className='single_article_grid_img' style={{
                                    display: 'flex'
                                }}>
                                    <div className='single_article_section_img' style={e?.image_position === "center"
                                        ? { marginInline: "auto", width: "60%", minWidth: "600px" }
                                        : e?.image_position === "left"
                                            ? { marginRight: "auto", width: "60%", minWidth: "600px" }
                                            : e?.image_position === "right"
                                                ? { marginLeft: "auto", width: "60%", minWidth: "600px" }
                                                : {}}>
                                        <img src={e?.image} />
                                    </div>
                                </div>}

                                {e?.heading && <h1>{e?.heading}</h1>}
                                {e?.description && <p>{e?.description}</p>}

                                {e?.button && <div onClick={(() => { e?.button_url && window.open(e?.button_url) })} style={{
                                    marginTop: '40px'
                                }}>
                                    <Button children={e?.button} />
                                </div>}
                            </>
                        ))
                        }

                        {/* <div className='single_article_grid_img'>
                            <div>
                                <img src={smallImg} />
                            </div>
                            <div>
                                <img src={smallImg2} />
                            </div>

                        </div> */}
                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>


                        <ul className='article_list'>
                            <li><img src={checkIcon} />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut. </li>

                            <li><img src={checkIcon} />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut. </li>

                            <li><img src={checkIcon} />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut. </li>

                            <li><img src={checkIcon} />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut. </li>

                            <li><img src={checkIcon} />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut. </li>

                            <li><img src={checkIcon} />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut. </li>
                        </ul> */}
                    </div>

                    <div className='single_article_right'>
                        <div className='single_article_search_input'>
                            <img src={searchIcon} />
                            <input placeholder='Search' />
                        </div>

                        <h4>Recents Posts</h4>

                        <div className='recent_posts_wrapper'>
                            {articleData?.map((e) => (
                                <div className='recent_post' onClick={(() => navigate(`/single-articles/${e?.id}`))}>
                                    <img src={e?.thumbnail_image} />
                                    <div className='recent_post_details'>
                                        <p>{e?.article_category?.name}</p>

                                        <small><TimeAgo date={e?.created_at} /></small>
                                        <h6>  {e?.description
                                            ?.split(" ")
                                            .slice(0, 8)
                                            .join(" ") + (e?.description?.split(" ").length > 15 ? "…" : "")}</h6>
                                    </div>
                                </div>
                            ))}

                            {articleData?.length <= 0 && <p style={{
                                textAlign: 'center',
                                color: 'var(--primary-color)',
                                fontWeight: '600'
                            }}>No recent posts available...</p>}

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleArticle
