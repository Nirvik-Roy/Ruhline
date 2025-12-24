import React from 'react'
import bigImg from '../../assets/Images/Rectangle 6737.png'
import BannerLayout from '../BannerLayout/BannerLayout'
import calendarLogo from '../../assets/Images/calendar_month.svg'
import smallImg from '../../assets/Images/Rectangle 6738.png'
import smallImg2 from '../../assets/Images/Rectangle 6739.png'
import checkIcon from '../../assets/Images/Vector (8).svg'
import searchIcon from '../../assets/Images/Search (1).svg'
import recentPosts from '../../assets/Images/image (2).png'
const SingleArticle = () => {
    return (
        <>
            <BannerLayout title={'How Yoga is useful'} />
            <div className='single_article_wrapper'>
                <div className='all_Container single_article_content_wrapper'>
                    <div className='single_article_img_content'>
                        <img className='big_article_img' src={bigImg} />
                        <div className='single_article_title_wrapper'>
                            <p style={{
                                background: '#fcf3ea'
                            }}>Life Coaching</p>
                            <div className='single_article_Date_Wrapper'>
                                <img src={calendarLogo} />
                                <p>10th April, 2025</p>
                            </div>
                        </div>

                        <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h1>

                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.</p>

                        <h1 style={{
                            marginTop: '20px'
                        }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et.</h1>

                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

                        <div className='single_article_grid_img'>
                            <div>
                                <img src={smallImg} />
                            </div>
                            <div>
                                <img src={smallImg2} />
                            </div>

                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>


                        <ul className='article_list'>
                            <li><img src={checkIcon} />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut. </li>

                            <li><img src={checkIcon} />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut. </li>

                            <li><img src={checkIcon} />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut. </li>

                            <li><img src={checkIcon} />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut. </li>

                            <li><img src={checkIcon} />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut. </li>

                            <li><img src={checkIcon} />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut. </li>
                        </ul>
                    </div>

                    <div className='single_article_right'>
                        <div className='single_article_search_input'>
                            <img src={searchIcon} />
                            <input />
                        </div>

                        <h4>Recents Posts</h4>

                        <div className='recent_posts_wrapper'>
                            {[1, 2, 3, 4, 5].map((e, i) => (
                                <div className='recent_post'>
                                    <img src={recentPosts} />
                                    <div className='recent_post_details'>
                                        {i < 2 && <p>Yoga</p>}
                                        {i >= 2 && <p>Life Coacing</p>}
                                        <small>10th April, 2025</small>
                                        <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleArticle
