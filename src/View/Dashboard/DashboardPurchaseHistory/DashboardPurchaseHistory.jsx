import './DashboardPurchaseHistory.css'
import React, { useEffect, useState } from 'react'
import Button from '../../../Components/Button/Button'
import Pagination from '../../../Components/Pagination/Pagination'
import { useNavigate } from 'react-router-dom'
import { getPurchaseHistory } from '../../../utils/purchaseHistory'
import Loaders from '../../../Components/Loaders/Loaders'
const DashboardPurchaseHistory = () => {
    const [dropdown, setdropdown] = useState(false);
    const navigate = useNavigate();
    const [loading, setloading] = useState(false)
    const [purchaseData, setpurchaseData] = useState([])

    const purchaseFunc = async () => {
        setloading(true)
        const res = await getPurchaseHistory()
        if (res?.success) {
            setpurchaseData(res?.data?.data)
        }
        setloading(false)
    }

    useEffect(() => {
        purchaseFunc()
    }, [])


    // Pagination logic only

    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * itemsPerPage;

    const currentItems = purchaseData?.slice(offset, offset + itemsPerPage);

    const pageCount = Math.ceil(purchaseData?.length / itemsPerPage);

    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected);
    };
    return (
        <>
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
                            }}>Purchase History</h3>
                        </div>
                    </div>
                </div>
                <div className='dashboard_support_list_Wrapper'>
                    {currentItems?.map((e) => (
                        <div className='dashboard_support'>
                            <div className='dashboard_support_header'>
                                <h2>#{e.id} <span style={{
                                    textTransform:'uppercase'
                                }}>{new Date(e?.created_at)
                                    .toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span></h2>
                                <div className='dashboard_support_status' style={{
                                    position: 'relative'
                                }}>

                                    <p style={{
                                        backgroundColor:'rgba(36, 159, 50, 1)'
                                    }}>{'Fulfilled '}</p>
                                    {/* <i onClick={(() => {
                                        if (dropdown === e.id) {
                                            setdropdown('')
                                        } else {
                                            setdropdown(e.id)
                                        }
                                    })} class="fa-solid fa-ellipsis"></i> */}

                                    {dropdown === e.id && <div className='dashboard_actions_wrapper' style={{
                                        bottom: '-80px'
                                    }}>
                                        <p onClick={(() => navigate(`/dashboard/purchase/single-purchase/2`))}>View</p>
                                        <p>Delete</p>
                                    </div>}
                                </div>
                            </div>
                            <div className='dashboard_subject_wrapper'>
                                <h4>Service Name: <span>{e?.program?.name}</span></h4>
                                <h4>Amount: <span>{e?.currency} {e?.total_amount}</span></h4>
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

export default DashboardPurchaseHistory
