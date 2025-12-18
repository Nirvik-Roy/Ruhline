import React from 'react'
import { Rating } from 'react-simple-star-rating'
import Textarea from '../../../Components/Inputs/Textarea'
import Button from '../../../Components/Button/Button'
const FeedBackModal = ({ setModal }) => {
    return (
        <>
            <div className='modal_wrapper'></div>
            <div className='feed_back_modal'>
                <i class="fa-solid fa-xmark" onClick={(() => setModal(false))}></i>
                <h1>We’d love your feedback</h1>
                <p>Based on your experience, how easy or difficult was it to interact with our company</p>
                <Rating
                    className='ratings'
                    size={50}
                    fillColor="gold"
                />
                <div style={{
                    width: '100%'
                }}>
                    <Textarea label={'Share details of your experience'} placeholder={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl lacinia nunc, a fermentum nunc nulla at quam. "} />

                </div>
                <div style={{
                    marginLeft: 'auto'
                }}>
                    <Button children={'Share'} />
                </div>

            </div>
        </>
    )
}

export default FeedBackModal
