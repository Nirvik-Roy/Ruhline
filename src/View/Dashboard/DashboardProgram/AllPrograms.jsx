import React from 'react'
import './DashboardProgram.css'
import img from '../../../assets/Images/image.png'

const AllPrograms = () => {
    const allProgramsData = [
        {
            id: 1,
            status: 'Pending',
            img: img,
            title: 'Program 1',
            type: 'One-time'
        },
        {
            id: 2,
            status: 'Pending',
            img: img,
            title: 'Program 1',
            type: 'One-time'
        },
        {
            id: 3,
            status: 'Completed',
            img: img,
            title: 'Program 1',
            type: 'One-time'
        },
        {
            id: 4,
            status: 'Completed',
            img: img,
            title: 'Program 1',
            type: 'Recurring'
        },
        {
            id: 5,
            status: 'Completed',
            img: img,
            title: 'Program 1',
            type: 'Recurring'
        },
        {
            id: 6,
            status: 'Completed',
            img: img,
            title: 'Program 1',
            type: 'Recurring'
        },
    ]
    return (
        <>
            <div className='all_programs_wrapper'>
                {allProgramsData.map((e, i) => (
                    <div className='all_program_card'>
                        <p style={e.status === 'Pending' ? {
                            background: 'rgba(255, 77, 73, 1)'
                        } : {
                            background: 'rgba(36, 159, 50, 1)'
                        }}>{e.status}</p>
                        <img src={e.img} />
                        <h6>{e.title}</h6>
                        <small>{e.type}</small>
                    </div>
                ))}

            </div>
        </>
    )
}

export default AllPrograms
