import React, { useEffect, useState } from 'react'
import Input from '../../../Components/Inputs/Input'
import Textarea from '../../../Components/Inputs/Textarea'
import upload from '../../../assets/Images/Vector (7).svg'
import Button from '../../../Components/Button/Button'
import Loaders from '../../../Components/Loaders/Loaders'
import { getDisputeformOptions, createDispute, getSingleDispute, editDispute } from '../../../utils/dispute'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import DashboardLoader from '../../../Components/Loaders/DashboardLoader'
const EditTicket = () => {
    const { id } = useParams()
    const [loading, setloading] = useState(false);
    const [postLoading,setpostLoading] = useState(false)
    const [disputeFormOptions, setdisputeFormOptions] = useState([]);
    const [disputeCategory, setdisputeCategory] = useState('issue_with_program');
    const [programId, setprogramId] = useState();
    const [disputeError, setdisputeError] = useState()
    const [imgfiles, setimgfiles] = useState([]);
    const [singleDispute, setSingleDispute] = useState()
    const [inputData, setinputData] = useState({
        subject: '',
        category: '',
        description: '',
        coach_id: '',
        checkout_order_id: '',
    })

    useEffect(() => {
        setinputData({
            subject: singleDispute?.subject || '',
            category: singleDispute?.category || '',
            description: singleDispute?.description || '',
            coach_id: singleDispute?.coach_id || '',
            checkout_order_id: singleDispute?.checkout_order_id || ''
        })
        setimgfiles(singleDispute?.attachments)
        setdisputeCategory(singleDispute?.category || '')
        setprogramId(singleDispute?.program?.id)
    }, [singleDispute])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setinputData({
            ...inputData,
            [name]: value
        })
    }
    const callDisputeOptions = async () => {
        setloading(true)
        const res = await getDisputeformOptions()
        setdisputeFormOptions(res)
        setloading(false)
    }
    useEffect(() => {
        callDisputeOptions()
    }, [])

    const handleDelete = (index) => {
        setimgfiles((prev) => (
            prev.filter((e, i) => i != index)
        ))
    }
    const handleUpload = (e) => {
        const files = e.target.files;
        if (files.length > 5) {
            toast.error("Max 5 files allowed");
            e.target.value = null; // reset input
            return;
        }
        if (imgfiles?.length == 5) {
            toast.error("Max 5 files can be uploaded")
        } else {
            setimgfiles([...imgfiles, ...files])
        }
        e.target.value = null
    }
    const editDisputeFunc = async (e) => {
        e.preventDefault()
        setpostLoading(true)
        const formData = new FormData();
        formData.append('subject', inputData?.subject)
        formData.append('category', disputeCategory)
        if (disputeCategory == 'issue_with_program' || disputeCategory == 'issue_with_coach') {
            formData.append('program_id', programId)
        }
        if (disputeCategory == 'issue_with_payments') {
            formData.append('checkout_order_id', inputData.checkout_order_id)
        }

        if (disputeCategory == 'issue_with_coach') {
            formData.append('coach_id', inputData.coach_id)
        }

        formData.append('description', inputData.description)
        if (imgfiles?.length > 0) {
            imgfiles?.forEach((element, index) => {
                if (element instanceof File) {
                    formData.append(`attachments[${index}]`, element)
                }
            })
        }
        const res = await editDispute(formData, id)
        setdisputeError(res?.errors)
        setpostLoading(false)
    }

    const singleDisputeFunc = async () => {
        setloading(true)
        const res = await getSingleDispute(id)
        setSingleDispute(res)
        setloading(false)
    }

    console.log(singleDispute)
    useEffect(() => {
        if (id) {
            singleDisputeFunc()
        }
    }, [])
    return (
        <>
            <div className='dashboard_content_wrapper'>
                {loading && <DashboardLoader />}

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
                            }}>Update Ticket</h3>
                        </div>
                    </div>
                </div>
                <form className='new_ticket_form_Wrapper'>
                    <div>
                        <Input onChange={handleChange} name={'subject'} value={inputData?.subject} type={'text'} label={'Subject'} required={true} placeholder={'Enter subject '} />
                        {disputeError?.subject && <small style={{
                            color: 'red',
                            marginLeft: '5px',
                            marginTop: '10px'
                        }}>* {disputeError?.subject[0]}</small>}
                    </div>
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
                                <input onChange={((e) => setdisputeCategory(e.target.value))} type='radio' value={'issue_with_program'} checked={disputeCategory == 'issue_with_program'} />
                                <p>Issue with program</p>
                            </li>

                            <li className='values_checkbox_wrapper'>
                                <input onChange={((e) => setdisputeCategory(e.target.value))} value={'issue_with_coach'} type='radio' checked={disputeCategory == 'issue_with_coach'} />
                                <p>Issue with coach</p>
                            </li>

                            <li className='values_checkbox_wrapper'>
                                <input onChange={((e) => setdisputeCategory(e.target.value))} value={'issue_with_payments'} type='radio' checked={disputeCategory == 'issue_with_payments'} />
                                <p>Issue with payments</p>
                            </li>
                        </ul>
                    </div>

                    {disputeCategory == 'issue_with_program' && <div className='values_form_input_Wrapper'>
                        <label>Select the program<span>*</span></label>
                        <select value={programId} onChange={((e) => setprogramId(Number(e?.target.value)))}>
                            <option value={''}>--select-program--</option>
                            {disputeFormOptions?.programs?.map((element) => (
                                <option value={element?.id} key={element?.id}>{element?.name}</option>
                            ))}
                        </select>
                    </div>
                    }

                    {(disputeError?.program_id && disputeCategory == 'issue_with_program')
                        && <small style={{
                            color: 'red',
                            marginLeft: '5px',
                            marginTop: '10px'
                        }}>* {disputeError?.program_id[0]}</small>}

                    {disputeCategory == 'issue_with_coach' && <div className='cofirm_form_grid_wrapper' style={{
                        marginTop: '-15px'
                    }}>
                        <div className='values_form_input_Wrapper'>
                            <label>Select the program<span>*</span></label>
                            <select value={programId} onChange={((e) => setprogramId(Number(e?.target.value)))}>
                                <option value={''}>--select-program--</option>
                                {disputeFormOptions?.programs?.map((element) => (
                                    <option value={element?.id} key={element?.id}>{element?.name}</option>
                                ))}
                            </select>
                            {(disputeError?.program_id && disputeCategory == 'issue_with_coach')
                                && <small style={{
                                    color: 'red',
                                    marginLeft: '5px',
                                }}>* {disputeError?.program_id[0]}</small>}
                        </div>
                        <div className='values_form_input_Wrapper'>
                            <label>Associated coach<span>*</span></label>
                            <select onChange={handleChange} name='coach_id' value={inputData?.coach_id}>
                                <option value={''}>--select-coach--</option>
                                {disputeFormOptions?.coaches_by_program[programId]?.map((element) => (
                                    <option value={element?.id} key={element?.id}>{element?.name}</option>
                                ))}
                            </select>

                            {(disputeError?.coach_id && disputeCategory == 'issue_with_coach')
                                && <small style={{
                                    color: 'red',
                                    marginLeft: '5px',
                                }}>* {disputeError?.coach_id[0]}</small>}
                        </div>


                    </div>}

                    {disputeCategory == 'issue_with_payments' && <div className='values_form_input_Wrapper'>
                        <label>Select transaction<span>*</span></label>
                        <select onChange={handleChange} name='checkout_order_id' value={inputData?.checkout_order_id}>
                            <option value={''}>--select-transcation--</option>
                            {disputeFormOptions?.orders?.map((element) => (
                                <option value={element?.id} key={element?.id}>#{element?.id} ({element?.program?.name})</option>
                            ))}
                        </select>
                        {(disputeError?.checkout_order_id && disputeCategory == 'issue_with_payments')
                            && <small style={{
                                color: 'red',
                                marginLeft: '5px',
                            }}>* {disputeError?.checkout_order_id[0]}</small>}
                    </div>}


                    <div className='values_form_input_Wrapper'>
                        <Textarea onChange={handleChange} value={inputData?.description} name={'description'} label={'Description'} required={true} placeholder={'Enter description'} />
                    </div>


                    {disputeError?.description
                        && <small style={{
                            color: 'red',
                            marginLeft: '5px',
                            marginTop: '10px'
                        }}>* {disputeError?.description[0]}</small>}

                    <div className='values_form_input_Wrapper'>
                        <label style={{
                            fontSize: '18px',
                            fontWeight: '600'
                        }}>Upload Files<span></span></label>

                        <div className='files_upload_wrapper'>
                            <img src={upload} />
                            <p>Drag your files or <span>Browse</span></p>
                            <h5>Png, Jpg, Jpeg supported | file size: 250 KB | max 5 files</h5>
                            <input onChange={handleUpload} multiple maxLength={5} max={5} type='file' />
                        </div>
                      
                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            position: 'relative',
                            marginTop: '10px'
                        }}>

                            {imgfiles?.map((e, index) => {
                                if (e instanceof File) {
                                    return (
                                        <>

                                            <div style={{
                                                position: 'relative'
                                            }}>
                                                <i onClick={(() => handleDelete(index))} style={{
                                                    fontSize: '14px',
                                                    position: 'absolute',
                                                    top: '-10px',
                                                    left: '70px',
                                                    cursor: 'pointer',
                                                    color: 'var(--primary-color)'
                                                }} class="fa-solid fa-circle-xmark"></i>
                                                <img

                                                    style={{
                                                        width: '80px',
                                                        height: '80px',
                                                        borderRadius: '5px',
                                                        objectFit: 'cover'
                                                    }}
                                                    key={index}
                                                    src={URL.createObjectURL(e)}
                                                    alt="preview"
                                                />
                                            </div>

                                        </>

                                    );
                                } else {
                                    return (
                                        <div style={{
                                            position: 'relative'
                                        }}>
                                            <i onClick={(() => handleDelete(index))} style={{
                                                fontSize: '14px',
                                                position: 'absolute',
                                                top: '-10px',
                                                left: '70px',
                                                cursor: 'pointer',
                                                color: 'var(--primary-color)'
                                            }} class="fa-solid fa-circle-xmark"></i>

                                            <img key={index} alt="preview" style={{
                                                width: '80px',
                                                height: '80px',
                                                borderRadius: '5px',
                                                objectFit: 'cover'
                                            }} src={e.url} />


                                            {(disputeError?.attachments)
                                                && <small style={{
                                                    color: 'red',
                                                    marginLeft: '5px',
                                                }}>* {disputeError?.attachments}</small>}
                                        </div>
                                    )

                                }
                            })}
                        </div>
                    </div>

                    <div className='cancel_select_button_wrapper' style={{
                        marginTop: '30px'
                    }}>
                        <button onClick={((e)=>e.preventDefault())}>Cancel</button>
                        <div onClick={editDisputeFunc}>
                            <Button loading={postLoading} loadingText='Updating...' children={'Update'} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditTicket
