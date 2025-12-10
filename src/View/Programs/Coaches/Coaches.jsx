import React from 'react'
import BannerLayout from '../../BannerLayout/BannerLayout'
import Pagination from '../../../Components/Pagination/Pagination'
import ProgramSidebar from '../ProgramSidebar'
import img from '../../../assets/Images/9aa56766fc589aef71a434e396c3b39e7b53e210.jpg'
import img1 from '../../../assets/Images/a1380e7f99749ba01d9fdc18ec22e32c85fd5a0e.jpg'
import img2 from '../../../assets/Images/b2d6b1b6bfbe8f8f3eb5ef556d41129707d892e6.jpg'
const Coaches = () => {
    const data = [
        {
            id: 1,
            title: 'Olivia Bennett',
            occupation: 'Health Care Consultant',
            img: img
        },
        {
            id: 2,
            title: 'Joseph Pitt',
            occupation: 'Health Care Consultant',
            img: img1
        },
        {
            id: 3,
            title: 'Olivia Bennett',
            occupation: 'Health Care Consultant',
            img: img2
        },
        {
            id: 1,
            title: 'Olivia Bennett',
            occupation: 'Health Care Consultant',
            img: img
        },
        {
            id: 2,
            title: 'Joseph Pitt',
            occupation: 'Health Care Consultant',
            img: img1
        },
        {
            id: 3,
            title: 'Olivia Bennett',
            occupation: 'Health Care Consultant',
            img: img2
        }
    ]
    return (
        <>
            <BannerLayout title={'Coaches'} />
            <div className='program_wrapper'>
                <div className='all_Container program_content_wrapper'>
                    <ProgramSidebar Coaches={true} Gender={true} />
                    <div className='program_content_right'>
                        <div className='program_content_grid_Wrapper'>
                            {data.map((e, i) => (

                                <div className='program_card156' key={e.id}>
                                    <img src={e.img} />
                                    {/* <h3>{e.title}</h3> */}
                                    <div className='overlay' style={{
                                        zIndex: 9
                                    }}></div>
                                    <div className='home_coach_slide_content' style={{
                                        zIndex: 9
                                    }}>
                                        <h5 style={{
                                        zIndex: 9
                                    }}>{e.title}</h5>
                                        <h6 style={{
                                        zIndex: 9
                                    }}>{e.occupation}</h6>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <Pagination />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Coaches
