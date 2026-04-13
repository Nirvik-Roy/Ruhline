import React, { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import Textarea from '../../../Components/Inputs/Textarea'
import Button from '../../../Components/Button/Button'
import Loaders from '../../../Components/Loaders/Loaders'
import { addProgramsReview, editProgramsReview } from '../../../utils/program'
import toast from 'react-hot-toast'
const FeedBackModal = ({ setModal, setfeedBackModal, id, fetchReviews, isEdit = false, reviewsData, editId, setedit }) => {
    const [rating, setRating] = useState(Number)
    const [description, setdescription] = useState('');
    const [loading, setloading] = useState(false);
    const postFeedback = async () => {
        if (rating && description != '') {
            setloading(true)
            const res = await addProgramsReview({
                program_enrollment_id: id,
                rating: rating,
                body: description
            })
            fetchReviews()
            setModal(false)
            setloading(false)
        } else {
            toast.error('Plz provide all the neccessary details..')
        }
    }
    const editFeedBack = async () => {
        if (rating && description != '') {
            setloading(true)
            const res = await editProgramsReview({
                program_enrollment_id: id,
                rating: rating,
                body: description
            }, editId)
            fetchReviews()
            setedit(false)
            setModal(false)
            setloading(false)

        } else {
            toast.error('Plz provide all the neccessary details..')
        }
    }


    useEffect(() => {
        if (isEdit && reviewsData?.length > 0) {
            setRating(reviewsData[0]?.rating)
            setdescription(reviewsData[0]?.body)
        }
    }, [isEdit])

    return (
        <>
            {loading && <Loaders />}
            <div className='modal_wrapper'></div>
            <div className='feed_back_modal'>
                <i class="fa-solid fa-xmark" onClick={(() => {
                    if (setfeedBackModal) {
                        setfeedBackModal(false)
                    }
                    setModal(false)
                })}></i>
                <h1>{isEdit ? 'Edit your feedback' : 'We’d love your feedback'}</h1>
                <p>Based on your experience, how easy or difficult was it to interact with our company</p>
                <Rating
                    onClick={((e) => setRating(e))}
                    className='ratings'
                    size={50}
                    initialValue={rating}
                    fillColor="gold"
                />
                <div style={{
                    width: '100%'
                }}>
                    <Textarea value={description} onChange={((e) => setdescription(e?.target?.value))} label={'Share details of your experience'} placeholder={"Share details..."} />

                </div>
                <div onClick={isEdit ? editFeedBack : postFeedback} style={{
                    marginLeft: 'auto'
                }}>
                    <Button children={isEdit ? 'Update' : 'Share'} />
                </div>

            </div>
        </>
    )
}

export default FeedBackModal
