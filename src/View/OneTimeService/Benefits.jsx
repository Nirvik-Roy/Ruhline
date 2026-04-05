import React from 'react'
import tick from '../../assets/Images/Vector (1).svg'
import img from '../../assets/Images/Rectangle 446.svg'
const Benefits = ({ singleProgramData }) => {
    return (
        <>
            <div className='service_expect_wrapper'>
                <div className='service_expert_left'>
                    <h3>Benefits</h3>
                    <div className='benefits_points_wrapper'>
                        {singleProgramData?.benefits?.length <=0 && <p>No benefits found...</p> }
                        {singleProgramData?.benefits?.map((e) => (
                            <div className='benefits_wrapper'>
                                <img src={tick} />
                                <p style={{
                                    backgroundColor: 'transparent'
                                }} dangerouslySetInnerHTML={{
                                    __html: e?.description
                                }}></p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='service_expert_right '>
                    <img src={singleProgramData?.benefits_section_image || img} />
                </div>
            </div>
        </>
    )
}

export default Benefits
