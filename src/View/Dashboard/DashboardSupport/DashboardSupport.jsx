import React, { useEffect, useState } from 'react'
import './DashboardSupport.css'
import Button from '../../../Components/Button/Button'
import Pagination from '../../../Components/Pagination/Pagination'
import { useNavigate } from 'react-router-dom'
import Loaders from '../../../Components/Loaders/Loaders'
import { deleteDispute, getDisputeList } from '../../../utils/dispute'
import DeleteModal from '../../../Components/DeleteModal/DeleteModal.jsx'
const DashboardSupport = () => {
    const [dropdown, setdropdown] = useState(false);
    const navigate = useNavigate();
    const [disputeList, setdisputeList] = useState([]);
    const [deleteModal, setdeleteModal] = useState(false);
    const [deletedId, setdeleteId] = useState()
    const [loading, setloading] = useState(false)
    const callDisputeList = async () => {
        setloading(true)
        const res = await getDisputeList()
        setdisputeList(res?.data)
        console.log(res)
        setloading(false)
    }
    useEffect(() => {
        callDisputeList()
    }, [])
    // Pagination logic only

    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * itemsPerPage;

    const currentItems = disputeList?.slice(offset, offset + itemsPerPage);

    const pageCount = Math.ceil(disputeList?.length / itemsPerPage);

    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected);
    };

    const handleDelete = async () => {
        setloading(true)
        const res = await deleteDispute(deletedId)
        if (res?.success) {
            setdeleteModal(false)
            callDisputeList()
        }
        setloading(false)
    }
    return (
        <>
            {deleteModal && <DeleteModal setdeleteModal={setdeleteModal} onClick={handleDelete} title={'Delete dispute'} details={'Do you really want to delete this dispute?'} />}
            {loading && <Loaders />}
            <div className='dashboard_content_wrapper'>
                <div className='schedule_program_head_wrapper' style={{
                    marginBottom: '30px'
                }}>
                    <div className='schedule_program_back_wrapper' style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <div className='schedule_program_head'>
                            <h3 style={{
                                marginBottom: '0px',
                                fontSize: '25px'
                            }}>Support</h3>

                        </div>
                        <div onClick={(() => navigate('/dashboard/support/add-ticket/2'))}>
                            <Button children={'Add New Ticket'} />
                        </div>

                    </div>
                </div>


                <div className='dashboard_support_list_Wrapper' style={{
                    minHeight: '60vh'
                }}>
                    {currentItems?.length <= 0 && <p style={{
                        fontWeight: '700',
                        color: 'var(--primary-color)',
                        textAlign: 'center'
                    }}>No dispute data found...</p>}
                    {currentItems?.map((e) => (
                        <div className='dashboard_support'>
                            <div className='dashboard_support_header'>
                                <h2>#{e.ticket_number} <span>{new Date(e?.created_at)
                                    .toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span></h2>
                                <div className='dashboard_support_status'>
                                    <p style={e?.status == 'open' ? {
                                        background: 'red'
                                    } : {
                                        background: 'green'
                                    }}>{e.status}</p>
                                    <i onClick={(() => {
                                        if (dropdown === e.id) {
                                            setdropdown('')
                                        } else {
                                            setdropdown(e.id)
                                        }
                                    })} class="fa-solid fa-ellipsis"></i>

                                    {dropdown === e.id && <div className='dashboard_actions_wrapper' style={ e?.status == 'closed' ?{
                                        top:'35px',
                                        height:'fit-content'
                                    }:{

                                    }}>
                                        <p onClick={(() => navigate(`/dashboard/support/view-ticket/${e?.id}`))}>View</p>
                                        {e?.status != 'closed' && <p onClick={(() => { navigate(`/dashboard/support/edit-ticket/${e?.id}`) })}>Edit</p>}
                                        <p onClick={(() => {
                                            setdeleteModal(true)
                                            setdeleteId(e?.id)
                                        })}>Delete</p>
                                    </div>}
                                </div>
                            </div>
                            <div className='dashboard_subject_wrapper'>
                                <h4>Subject: <span>{e?.subject}</span></h4>
                                <h4>Dispute Category: <span style={{
                                    textTransform: 'capitalize'
                                }}> {e?.category}</span></h4>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination pageCount={pageCount}
                    currentPage={currentPage}
                    onPageChange={handlePageChange} />
            </div>
        </>
    )
}

export default DashboardSupport
