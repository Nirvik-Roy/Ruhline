import React from 'react'
import { Rating } from 'react-simple-star-rating'
import img from '../../assets/Images/pngtree-default-avatar-profile-icon-gray-placeholder-vector-png-image_16213764.png'
const ReviewCard = ({ isedit, isDelete, value = 5, title = 'Anonymous', description, date,onEdit,onDelete }) => {
    return (
        <>
            <div className='service_review_wrapper'>
                <div className='service_review_img_wrapper'>
                    <img src={img} />
                    <p>{title}</p>
                </div>
                <div className='service_review_details'>
                    <div className='service_review_rating_wrapper' style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <Rating
                            className='ratings'
                            size={20}
                            initialValue={value}
                            disableFillHover
                            readonly
                            fillColor="gold"
                            style={{
                                marginBottom: '0'
                            }}
                        />
                        <p>Reviewed on {date}</p>
                        {isedit && <i onClick={onEdit} style={{
                            cursor:'pointer',
                            color:'green'
                        }} class="fa-regular fa-pen-to-square"></i>}
                        {isDelete && <i onClick={onDelete} style={{
                            cursor: 'pointer',
                            color:'red',
                            marginLeft:'-10px'
                        }} class="fa-regular fa-trash-can"></i>}
                    </div>
                    <p className='review_text'>{description}</p>
                </div>
            </div>
        </>
    )
}

export default ReviewCard
