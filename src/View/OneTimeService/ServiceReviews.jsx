import React from 'react'
import star from '../../assets/Images/Mask.svg'
import img from '../../assets/Images/Ellipse 19.svg'
import rating from '../../assets/Images/Frame 80913.svg'
const ServiceReviews = () => {
    return (
        <>
            <div className='service_reviews_wrapper'>
                <h1 className='all_heading2' style={{
                    fontWeight: '600'
                }}>Reviews</h1>
                <div className='service_content_wrapper'>
                    <div className='service_reviews_left'>
                        <small>Summary</small>
                        <div className='service_rating_wrapper'>
                            <div className='service_rating'>
                                <h3>4.5  </h3>
                                <img src={star} />
                            </div>
                            <p>273 Reviews</p>
                        </div>
                        <div className='different_ratings_wrapper'>
                            <div className='rating5_wrapper'>
                                <p>5</p>
                                <div className='rating_outside_wrapper'>
                                    <div className='rating_inside_wrapper'></div>
                                </div>
                            </div>

                            <div className='rating5_wrapper'>
                                <p>4</p>
                                <div className='rating_outside_wrapper'>
                                    <div className='rating_inside_wrapper' style={{
                                        width: '80%'
                                    }}></div>
                                </div>
                            </div>

                            <div className='rating5_wrapper'>
                                <p>3</p>
                                <div className='rating_outside_wrapper'>
                                    <div className='rating_inside_wrapper' style={{
                                        width: '60%'
                                    }}></div>
                                </div>
                            </div>

                            <div className='rating5_wrapper'>
                                <p>2</p>
                                <div className='rating_outside_wrapper'>
                                    <div className='rating_inside_wrapper' style={{
                                        width: '40%'
                                    }}></div>
                                </div>
                            </div>

                            <div className='rating5_wrapper'>
                                <p>1</p>
                                <div className='rating_outside_wrapper'>
                                    <div className='rating_inside_wrapper' style={{
                                        width: '20%'
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='service_reviews_right'>
                        {[1, 2, 3].map((e, i) => (
                            <div className='service_review_wrapper'>
                                <div className='service_review_img_wrapper'>
                                    <img src={img} />
                                    <p>Mark Doe</p>
                                </div>
                                <div className='service_review_details'>
                                    <div className='service_review_rating_wrapper'>
                                        <img src={rating} />
                                        <p>Reviewed on 22nd March, 2024</p>
                                    </div>
                                    <p className='review_text'>I was initially apprehensive, having no prior design experience.
                                        But the instructor, John Doe, did an amazing job of breaking down complex
                                        concepts into easily digestible modules. The video lectures were engaging,
                                        and the real-world examples really helped solidify my understanding.</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </>
    )
}

export default ServiceReviews
