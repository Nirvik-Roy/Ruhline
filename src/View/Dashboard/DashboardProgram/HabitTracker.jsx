import React, { useEffect, useRef, useState } from 'react'
import HabittrackerForm from './HabittrackerForm'
import Button from '../../../Components/Button/Button'
import Pagination from '../../../Components/Pagination/Pagination'
import UpdateHabittrackerForm from './UpdateHabittrackerForm'
import { deleteHabit } from '../../../utils/program'
import { useParams } from 'react-router-dom'
import Loaders from '../../../Components/Loaders/Loaders'
import DeleteModal from '../../../Components/DeleteModal/DeleteModal'

const HabitTracker = ({ habbitContent, sethabbitContent }) => {
    const { enrollmentId } = useParams()
    const dropdownRef = useRef()
    const [createHabit, setcreateHabit] = useState(false)
    const [dropdown, setdropdown] = useState('');
    const [habitId, sethabitId] = useState('')
    const [editHabit, seteditHabit] = useState(false)
    const [deleteModal, setdeleteModal] = useState(false)
    const [loading, setloading] = useState(false)
    // Pagination logic only
    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * itemsPerPage;

    const currentItems = habbitContent?.habits?.slice(offset, offset + itemsPerPage);

    const pageCount = Math.ceil(habbitContent?.habits?.length / itemsPerPage);

    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected);
    };


      const handleDelete = async () => {
            setloading(true)
            const res = await deleteHabit(enrollmentId, habbitContent?.program_structure_id, habitId)
            if (res?.success) {
                sethabbitContent(res?.data)
                setdeleteModal(false)
                sethabitId('')
            }
            setloading(false)
        }


    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setdropdown([]);
        }
    };


    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <>
        {loading && <Loaders/>}
        {deleteModal && <DeleteModal setdeleteModal={setdeleteModal} details={'Do you really want to remove this habit?'} title={'Remove habit'} onClick={handleDelete}/>}
            {(!createHabit && !editHabit) && <div>
                <div className='values_head' style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    <h4><span>Habit Tracker</span> </h4>
                    <Button onClick={(() => setcreateHabit(true))} children={'Create Habit'} />
                </div>

                {/* This habit list design is taken from dashboard purchase history.. The css is in the dashboard purchase history */}

                <div className='goal_list_wrapper' style={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '15px',
                    marginTop: '30px'
                }}>
                    {currentItems?.length <= 0 && <p style={{
                        textAlign: 'center',
                        color: 'var(--primary-color)'
                    }}>No habits added...</p>}
                    {currentItems?.map((element, index) => (
                        <div className='dashboard_support'>
                            <div className='dashboard_support_header'>
                                <h2>{element?.habit_name} <span style={{
                                    textTransform: 'capitalize'
                                }}>{element?.target_count} | {element?.linked_goal_name} | {element?.reminder_time && element?.reminder_time?.slice(0, 5)}</span></h2>
                                <div className='dashboard_support_status' style={{
                                    position: 'relative'
                                }}>
                                    <i onClick={((e) => {
                                        e.stopPropagation()
                                        if (dropdown === index) {
                                            setdropdown('')
                                        } else {
                                            setdropdown(index)
                                        }
                                    })} class="fa-solid fa-ellipsis"></i>

                                    {dropdown === index && <div ref={dropdownRef} className='dashboard_actions_wrapper' style={{
                                        bottom: '-70px'
                                    }}>
                                        <p onClick={((e) => {
                                            e.stopPropagation()
                                            seteditHabit(true)
                                            sethabitId(element?.id)
                                        })}>Edit</p>
                                        <p onClick={((e) => {
                                            e.stopPropagation()
                                            setdeleteModal(true)
                                            sethabitId(element?.id)
                                        })}>Delete</p>
                                    </div>}
                                </div>
                            </div>
                            <div className='dashboard_subject_wrapper' style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <h4>Habit Type: <span>{element?.habit_type_name}</span></h4>
                                <h4>Frequency: <span> {element?.frequency_label}</span></h4>
                            </div>
                        </div>
                    ))}
                </div>

                <Pagination pageCount={pageCount}
                    currentPage={currentPage}
                    onPageChange={handlePageChange} />
            </div>}

            {createHabit && <HabittrackerForm setcreateHabit={setcreateHabit} sethabbitContent={sethabbitContent} habbitContent={habbitContent} setcreateHabit={setcreateHabit} />}

            {editHabit && <UpdateHabittrackerForm seteditHabit={seteditHabit} habitId={habitId} habbitContent={habbitContent} sethabbitContent={sethabbitContent} />}


        </>
    )
}

export default HabitTracker
