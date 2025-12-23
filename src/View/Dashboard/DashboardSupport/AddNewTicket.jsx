import React, { useState } from 'react'
import Input from '../../../Components/Inputs/Input'
import Textarea from '../../../Components/Inputs/Textarea'
import upload from '../../../assets/Images/Vector (7).svg'
import Button from '../../../Components/Button/Button'
const AddNewTicket = () => {
    const [ticketIssue, setticketIssue] = useState({
        programIssue: true,
        coachIssue: false,
        paymentsIssue: false
    })
    return (
        <>
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
                            }}>Add Ticket</h3>
                        </div>
                    </div>
                </div>
                <form className='new_ticket_form_Wrapper'>
                    <Input type={'text'} label={'Subject'} required={true} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit '} />
                    <div className='values_form_input_Wrapper' style={{
                        marginBottom: '30px'
                    }}>
                        <label>Category<span>*</span></label>
                        <ul className='values_checkbox_button' style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            gap: '15px',
                            flexDirection: 'row',
                            marginTop: '10px',
                            flexWrap: 'wrap'
                        }}>
                            <li className='values_checkbox_wrapper'>
                                <input type='radio' onClick={(() => setticketIssue({
                                    programIssue: true,
                                    coachIssue: false,
                                    paymentsIssue: false
                                }))} checked={ticketIssue.programIssue} />
                                <p>Issue with program</p>
                            </li>

                            <li className='values_checkbox_wrapper'>
                                <input type='radio' onClick={(() => setticketIssue({
                                    programIssue: false,
                                    coachIssue: true,
                                    paymentsIssue: false
                                }))} checked={ticketIssue.coachIssue} />
                                <p>Issue with coach</p>
                            </li>

                            <li className='values_checkbox_wrapper'>
                                <input type='radio' onClick={(() => setticketIssue({
                                    programIssue: false,
                                    coachIssue: false,
                                    paymentsIssue: true
                                }))} checked={ticketIssue.paymentsIssue} />
                                <p>Issue with payments</p>
                            </li>
                        </ul>
                    </div>

                    {ticketIssue.programIssue && <div className='values_form_input_Wrapper'>
                        <label>Select the program<span>*</span></label>
                        <select>
                            <option>Program 1</option>
                        </select>
                    </div>}

                    {ticketIssue.coachIssue && <div className='cofirm_form_grid_wrapper' style={{
                        marginTop: '-15px'
                    }}>
                        <div className='values_form_input_Wrapper'>
                            <label>Select the program<span>*</span></label>
                            <select>
                                <option>Program 1</option>
                            </select>
                        </div>
                        <div className='values_form_input_Wrapper'>
                            <label>Associated coach<span>*</span></label>
                            <select>
                                <option>Mark John</option>
                            </select>
                        </div>
                    </div>}

                    {ticketIssue.paymentsIssue && <div className='values_form_input_Wrapper'>
                        <label>Select transaction<span>*</span></label>
                        <select>
                            <option>Order#8975</option>
                        </select>
                    </div>}
                    <div className='values_form_input_Wrapper'>
                        <Textarea label={'Description'} required={true} placeholder={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'} />

                    </div>

                    <div className='values_form_input_Wrapper'>
                        <label style={{
                            fontSize: '18px',
                            fontWeight: '600'
                        }}>Upload Files<span>*</span></label>

                        <div className='files_upload_wrapper'>
                            <img src={upload} />
                            <p>Drag your files or <span>Browse</span></p>
                            <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                            <input type='file' />
                        </div>
                    </div>

                    <div className='cancel_select_button_wrapper' style={{
                        marginTop: '30px'
                    }}>

                        <button>Cancel</button>
                        <div>

                            <Button children={'Select'} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddNewTicket
