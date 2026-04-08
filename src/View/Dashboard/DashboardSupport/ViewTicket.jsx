import React, { useEffect, useState } from 'react'
import Button from '../../../Components/Button/Button'
import { getSingleDispute } from '../../../utils/dispute'
import { useParams } from 'react-router-dom'
import Loaders from '../../../Components/Loaders/Loaders'

const ViewTicket = () => {
    const { id } = useParams()
    const [singleDispute, setsingleDispute] = useState({})
    const [loading, setloading] = useState(false)
    const singleDisputeFunc = async () => {
        setloading(true)
        const res = await getSingleDispute(id)
        setsingleDispute(res)
        setloading(false)
    }
    useEffect(() => {
        if (id) {
            singleDisputeFunc()
        }
    }, [])


    return (
        <>
            {loading && <Loaders />}
            <div className='dashboard_content_wrapper'>
                <div className='view_ticket_Wrapper'>
                    <div className='view_ticket_headings'>
                        <h1>#{singleDispute?.ticket_number}</h1>
                        <p style={singleDispute?.status == 'open' ? {
                            background: 'red'
                        } : {
                            background: 'green'
                        }}>{singleDispute?.status}</p>
                    </div>
                    <div className='ticket_details_list_wrapper'>
                        <p>Date & Time: <span>{new Date(singleDispute?.created_at)
                            .toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span></p>
                        {/* <p>Time: <span>06:35 PM</span></p> */}
                        <p>Dispute Category: <span>{singleDispute?.category}</span></p>
                        {singleDispute?.program && <p>Program: <span>{singleDispute?.program?.name}</span></p>}
                        <p>Subject: <span>{singleDispute?.subject}</span></p>
                        <p>Description: <br /><span>{singleDispute?.description} </span></p>
                    </div>
                    <Button styles={{ fontSize: '18px', backgroundColor: 'transparent', border: '1px solid var(--primary-color)', color: '#000', marginTop: '30px' }} children={'Download Attachments'} />
                </div>

                <div className='cancel_select_button_wrapper' style={{
                    marginTop: '30px'
                }}>

                    <button>Delete</button>
                    <div>

                        <Button children={'Edit'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewTicket
