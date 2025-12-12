import React from 'react'
import tick from '../../assets/Images/Vector (1).svg'
import img from '../../assets/Images/Rectangle 446.svg'
const ServiceExpect = () => {
    return (
        <>
            <div className='service_expect_wrapper'>
                <div className='service_expert_left'>
                    <h3>Benefits</h3>
                    <div className='benefits_points_wrapper'>
                    {[1,2,3].map((e,i)=>(

                        <div className='benefits_wrapper'>
                            <img src={tick} />
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                        </div>
                    ))}
                    </div>
                </div>
                <div className='service_expert_right '>
                    <img src={img}/>
                </div>
            </div>
        </>
    )
}

export default ServiceExpect
