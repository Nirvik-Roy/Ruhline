import React from 'react'
import Button from '../../../Components/Button/Button'

const ViewTicket = () => {
    return (
        <>
            <div className='dashboard_content_wrapper'>
                <div className='view_ticket_Wrapper'>
                    <div className='view_ticket_headings'>
                        <h1>#ST456666</h1>
                        <p>Open</p>
                    </div>
                    <div className='ticket_details_list_wrapper'>
                        <p>Date: <span>16/02/2025</span></p>
                        <p>Time: <span>06:35 PM</span></p>
                        <p>Dispute Category: <span>Issue with program</span></p>
                        <p>Program: <span>Program 1</span></p>
                        <p>Subject: <span>Lorem Ipsum dcolor vistue</span></p>
                        <p>Description: <br /><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </span></p>
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
