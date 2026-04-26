import React, { useEffect, useRef, useState } from 'react'
import PrevSubmit from '../../../Components/PrevSubmit/PrevSubmit'
import Button from '../../../Components/Button/Button'
import GoalSettingForm from './GoalSettingForm';
import EditGoalSettingForm from './EditGoalSettingsForm';
import DeleteModal from '../../../Components/DeleteModal/DeleteModal.jsx'
import { deleteGoal } from '../../../utils/program';
import { useParams } from 'react-router-dom';
import Loaders from '../../../Components/Loaders/Loaders';
import Pagination from '../../../Components/Pagination/Pagination.jsx';
const GoalSetting = ({ goalsettingsContent, setgoalSettingsContent }) => {
    const [dropdown, setdropdown] = useState('');
    const [createGoal, setcreateGoal] = useState(false);
    const [goalId, setgoalId] = useState()
    const [editGoal, seteditGoal] = useState(false);
    const [loading, setloading] = useState(false);
    const [deleteModal, setdeleteModal] = useState(false);
    const { enrollmentId } = useParams()
    const dropdownRef = useRef()

    const handleDelete = async () => {
        
        setloading(true)
        const res = await deleteGoal(enrollmentId, goalsettingsContent?.program_structure_id, goalId)
        if (res?.success) {
            setgoalSettingsContent(res?.data)
            setdeleteModal(false)
            setgoalId('')
        }
        setloading(false)
    }


    // Pagination logic only

    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * itemsPerPage;

    const currentItems = goalsettingsContent?.goals?.slice(offset, offset + itemsPerPage);

    const pageCount = Math.ceil(goalsettingsContent?.goals?.length / itemsPerPage);

    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected);
    };


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
            {deleteModal && <DeleteModal loading={loading} onClick={handleDelete} setdeleteModal={setdeleteModal} title={'Delete goal'} details={'Do you really want to delete this goal?'} />}
            {(!createGoal && !editGoal) && <div>
                <div className='values_head' style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    <h4><span>Goal Settings:</span> Create your own goal </h4>
                    <Button onClick={(() => setcreateGoal(true))} children={'Create Goal'} />
                </div>

                {/* This goal list design is taken from dashboard purchase history.. The css is in the dashboard purchase history */}

                <div className='goal_list_wrapper' style={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '15px',
                    marginTop: '30px'
                }}>
                    {currentItems?.length <= 0 && <p style={{
                        textAlign: 'center',
                        color: 'var(--primary-color)'
                    }}>No goals added...</p>}
                    {currentItems?.map((element, index) => (
                        <div className='dashboard_support'>
                            <div className='dashboard_support_header'>
                                <h2>{element?.goal_name} <span style={{
                                    textTransform: 'capitalize'
                                }}>{element?.goal_type}</span></h2>
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

                                    {dropdown === index && <div ref={dropdownRef}
                                    className='dashboard_actions_wrapper' style={{
                                        bottom: '-70px'
                                    }}>
                                        <p onClick={(() => {
                                            seteditGoal(true)
                                            setgoalId(element?.id)
                                        })}>Edit</p>
                                        <p onClick={(() => {
                                            setdeleteModal(true)
                                            setgoalId(element?.id)
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
                                <h4>Start Date: <span>{element?.start_date}</span></h4>
                                <h4>Duration: <span> {element?.duration_label}</span></h4>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination pageCount={pageCount}
                    currentPage={currentPage}
                    onPageChange={handlePageChange} />
            </div>}

            {createGoal && <GoalSettingForm setcreateGoal={setcreateGoal} setgoalSettingsContent={setgoalSettingsContent} goalsettingsContent={goalsettingsContent} />}

            {editGoal && <EditGoalSettingForm seteditGoal={seteditGoal} setgoalSettingsContent={setgoalSettingsContent} goalsettingsContent={goalsettingsContent} goalId={goalId} />}

        </>
    )
}

export default GoalSetting
