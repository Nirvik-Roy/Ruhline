import React, { useEffect, useState } from 'react'
import arrow from '../../../assets/Images/Vector (4).svg'
import logo from '../../../assets/Images/Frame 1984078480.svg'
import Button from '../../../Components/Button/Button'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { getSinglePurchaseHistory } from '../../../utils/purchaseHistory'
import Loaders from '../../../Components/Loaders/Loaders'
import DashboardLoader from '../../../Components/Loaders/DashboardLoader'
const SinglePurchaseHistory = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setloading] = useState(false)
    const [purchaseData, setpurchaseData] = useState({})
    const { profileData } = useOutletContext();
    const purchaseFunc = async () => {
        setloading(true)
        const res = await getSinglePurchaseHistory(id)
        if (res?.success) {
            setpurchaseData(res?.data)
        }
        setloading(false)
    }
    useEffect(() => {
        purchaseFunc()
    }, [])
    return (
        <>
            <div className='dashboard_content_wrapper'>
                {loading && <DashboardLoader />}
                {!loading && <>

                    <div className='schedule_program_head_wrapper' style={{
                        marginBottom: '30px'
                    }}>
                        <div className='schedule_program_back_wrapper'>
                            <img onClick={(() => navigate(-1))} src={arrow} />
                            <div className='schedule_program_head'>
                                <h3 style={{
                                    marginBottom: '0px'
                                }}> #{purchaseData?.id}</h3>
                            </div>
                        </div>
                    </div>
                    <div className='single_purchase_details_wrapper'>
                        <div className='single_purchase_head_wrappper'>
                            <img src={logo} />
                            <div className='single_purchase_head_details_wrapper'>
                                <div className='single_purchase_address'>
                                    <p>Office 149, 450 South Brand Brooklyn
                                        San Diego County, CA 91905, USA
                                        +1 (123) 456 7891, +44 (876) 543 2198</p>
                                </div>
                                <div className='single_id_wrapper'>
                                    <h1>Invoice ID: #{purchaseData?.id}</h1>
                                    <p>Order Placed: {new Date(purchaseData?.created_at)
                                        .toLocaleString("en-IN", { dateStyle: "short", timeZone: 'utc' })}</p>
                                    <p style={{
                                        textTransform: 'capitalize'
                                    }}>Payment: {purchaseData?.status}</p>
                                </div>
                            </div>
                        </div>

                        <div className='single_purchase_invoice_wrapper'>
                            <h3>Invoice To:</h3>
                            <ul>
                                <li>{profileData?.name}</li>
                                <li>{profileData?.profile?.address_line_1}</li>
                                <li>{profileData?.profile?.address_line_2}</li>
                                <li>{profileData?.profile?.postal_code}</li>
                                <li>{profileData?.email}</li>
                            </ul>
                        </div>

                        <div className='table_container'>
                            <table className='total_table_order_wrapper'>
                                <thead>
                                    <tr>
                                        <th style={{
                                            textAlign: 'left'
                                        }}>Service Name</th>
                                        <th style={{
                                            textAlign: 'left'
                                        }}>Coach</th>
                                        <th style={{
                                            textAlign: 'right'
                                        }}>Price</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>{purchaseData?.program?.name}</td>
                                        <td>{purchaseData?.coach?.name}</td>
                                        <td style={{
                                            textAlign: 'right'
                                        }}>{purchaseData?.currency} {purchaseData?.subtotal_amount}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <div className='total_wrapper_46662'>
                            <p>Total:</p>
                            <h4>{purchaseData?.currency} {purchaseData?.total_amount}</h4>
                        </div>

                        <p style={{
                            color: 'var(--text-color)',
                            fontSize: '15px',
                            marginTop: '50px'
                        }}>Note: It was a pleasure working with you and your team. Thank You!</p>
                    </div>

                    <Button children={'Cancel Program'} styles={{
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: 'rgba(255, 77, 73, 1)',
                        fontWeight: '600',
                        fontSize: '15px',
                        marginLeft: 'auto',
                        marginTop: '30px'
                    }} />
                </>}
            </div>
        </>
    )
}

export default SinglePurchaseHistory
