import React from 'react'
import '../Programs.css'
import BannerLayout from '../../BannerLayout/BannerLayout'
import Pagination from '../../../Components/Pagination/Pagination'
import ProgramSidebar from '../ProgramSidebar'
import img from '../../../assets/Images/Rectangle 448.png'
import img1 from '../../../assets/Images/Rectangle 448 (1).png'
import img2 from '../../../assets/Images/Rectangle 448 (2).png'
const Yoga = () => {
    const data = [
        {
            id: 1,
            title: 'Service 1',
            img: img
        },
        {
            id: 2,
            title: 'Service 2',
            img: img1
        },
        {
            id: 3,
            title: 'Service 3',
            img: img2
        },
        {
            id: 1,
            title: 'Service 1',
            img: img
        },
        {
            id: 2,
            title: 'Service 2',
            img: img1
        },
        {
            id: 3,
            title: 'Service 3',
            img: img2
        }
    ]
    return (
        <>
            <BannerLayout title={'Yoga'} />
            <div className='program_wrapper'>
                <div className='all_Container program_content_wrapper'>
                    <ProgramSidebar Category={true} Enrollment={true} />
                    <div className='program_content_right'>
                        <div className='program_content_grid_Wrapper'>
                            {data.map((e, i) => (

                                <div className='program_card156' key={e.id}>
                                    <img src={e.img} />
                                    <h3>{e.title}</h3>
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

export default Yoga
