import React from 'react'
import arrow from '../../../assets/Images/Vector (4).svg'
import logo from '../../../assets/Images/Frame 1984078480.svg'
import Button from '../../../Components/Button/Button'
import { useNavigate } from 'react-router-dom'
const SinglePurchaseHistory = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='dashboard_content_wrapper'>
                <div className='schedule_program_head_wrapper' style={{
                    marginBottom: '30px'
                }}>
                    <div className='schedule_program_back_wrapper'>
                        <img onClick={(()=>navigate(-1))} src={arrow} />
                        <div className='schedule_program_head'>
                            <h3 style={{
                                marginBottom: '0px'
                            }}> #3492</h3>
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
                                <h1>Invoice ID: #3492</h1>
                                <p>Order Placed: 25/08/2020</p>
                                <p>Payment: Paid</p>
                            </div>
                        </div>
                    </div>

                    <div className='single_purchase_invoice_wrapper'>
                        <h3>Invoice To:</h3>
                        <ul>
                            <li>Thomas shelby</li>
                            <li>Shelby Company Limited</li>
                            <li>Small Heath, B10 0HF, UK</li>
                            <li>718-986-6062</li>
                            <li>peakyFBlinders@gmail.com</li>
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
                                    <td>Service 1</td>
                                    <td>Bidisha Bhowmick</td>
                                    <td style={{
                                        textAlign: 'right'
                                    }}>SAR 32</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                    <div className='total_wrapper_46662'>
                        <p>Total:</p>
                        <h4>SAR 32</h4>
                    </div>

                    <p style={{
                        color: 'var(--text-color)',
                        fontSize: '15px',
                        marginTop: '50px'
                    }}>Note: It was a pleasure working with you and your team. Thank You!</p>
                </div>

                <Button children={'Cancel Program'} styles={{
                    border:'none',
                    backgroundColor:'transparent',
                    color:'rgba(255, 77, 73, 1)',
                    fontWeight:'600',
                    fontSize:'15px',
                    marginLeft:'auto',
                    marginTop:'30px'
                }}/>
            </div>
        </>
    )
}

export default SinglePurchaseHistory
