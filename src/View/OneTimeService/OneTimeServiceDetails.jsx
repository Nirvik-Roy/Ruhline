import React, { useState } from 'react'
import bigImg from '../../assets/Images/Rectangle 445 (1).svg'
import LoginRequiredModal from '../LoginRequiredModal/LoginRequiredModal.jsx'
import './OneTimeProgram.css'
import Button from '../../Components/Button/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
const OneTimeServiceDetails = ({ singleProgramData }) => {
    const navigate = useNavigate();
    const { isLogin } = useSelector(state => state.auth);
    const {id} = useParams()
    const [loginRequiredModal, setloginRequiredModal] = useState(false)
    const openModal = () => {
        if (isLogin) {
            navigate(`/available-facilitor/${id}`)
        } else {
            setloginRequiredModal(true)
        }
    }

    return (
        <>
            {loginRequiredModal && <LoginRequiredModal setloginRequiredModal={setloginRequiredModal} />}
            <div className='one_time_service_details_wrapper'>
                <div className='left_one_time_service'>
                    <div className='service_big_img'>
                        <img src={singleProgramData?.main_image || bigImg} />
                    </div>
                    <div className='service_small_img_wrapper'>
                        {singleProgramData?.gallery_images?.map((e, i) => (
                            <div key={i} className='service_small_img'>
                                <img src={e?.image_path} />
                            </div>
                        ))}

                    </div>
                </div>
                <div className='right_one_time_service_details'>
                    {singleProgramData?.tag && <small>{singleProgramData?.tag}</small>}
                    <div>
                        {singleProgramData?.original_price && <del>SAR{singleProgramData?.original_price}</del>}
                        {singleProgramData?.sale_price && <h1>SAR{singleProgramData?.sale_price}</h1>}
                    </div>
                    {singleProgramData?.program_category?.name && <span><strong>Categories: </strong>{singleProgramData?.program_category?.name}</span>}
                    <span><strong>Occurrence: </strong>{singleProgramData?.occurrence_type}</span>
                    {singleProgramData?.session_duration_minutes && <span><strong>Session Duration: </strong>{singleProgramData?.session_duration_minutes} mins</span>}
                    {singleProgramData?.sessions_per_week && <span><strong>Session Per Week: </strong>{singleProgramData?.sessions_per_week}</span>}
                    {singleProgramData?.tenure_weeks && <span><strong>Tenure: </strong>{singleProgramData?.tenure_weeks} weeks</span>}

                    <p style={{
                        backgroundColor: 'transparent'
                    }} dangerouslySetInnerHTML={{
                        __html: singleProgramData?.description
                    }}>

                    </p>
                    <div onClick={(() => openModal())}>
                        <Button children={'Book Now'} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default OneTimeServiceDetails
