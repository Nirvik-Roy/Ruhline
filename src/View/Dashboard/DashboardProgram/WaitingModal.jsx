import React from 'react'
import img from '../../../assets/Images/Vector (5).svg'
const WaitingModal = ({ setmodalIsopen }) => {
    return (
        <>
            <div className='modal_wrapper' onClick={(() => (setmodalIsopen(false)))}>

            </div>
            <div className='waiting_modal_div'>
                <img src={img} />
                <i onClick={(() => (setmodalIsopen(false)))} class="fa-solid fa-xmark"></i>
                <h1>Please Wait</h1>
                <p>Facilitator will unlock these modules</p>
            </div>
        </>
    )
}

export default WaitingModal
