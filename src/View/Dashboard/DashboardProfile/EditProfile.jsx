import React from 'react'
import Input from '../../../Components/Inputs/Input'
import countryData from '../../../../countries.json'
import upload from '../../../assets/Images/Vector (7).svg'
import Button from '../../../Components/Button/Button'
const EditProfile = () => {
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
                        width: '100%',
                        flexWrap: 'wrap',
                        gap: '15px'
                    }}>
                        <div className='schedule_program_head'>
                            <h3 style={{
                                marginBottom: '0px',
                                fontSize: '25px'
                            }}>Edit Profile</h3>

                        </div>


                    </div>
                </div>

                <form className='confirm_form_wrapper'>
                    <div className='cofirm_form_grid_wrapper'>
                        <Input label={'First Name'} type={'text'} required={true} placeholder={'Bidisha'} />
                        <Input label={'Last Name'} type={'text'} required={true} placeholder={'Bhowmick'} />
                        <Input label={'Email'} type={'email'} required={true} placeholder={'bidishab@gmail.com'} />
                        <div className='input_form confirm_input_form'>
                            <label>Phone <span>*</span></label>
                            <div className='phone_input_Wrapper656'>
                                <select>
                                    {countryData.map((e, i) => (
                                        <option key={e.code}>{e.code}</option>
                                    ))}

                                </select>
                                <input placeholder='1234567890' />
                            </div>

                        </div>
                    </div>

                    <h4 style={{
                        fontWeight: '600',
                        fontSize: '20px',
                        color: 'var(--text-color)',
                        margin: '30px 0'
                    }}>Address</h4>

                    <div className='cofirm_form_grid_wrapper'>
                        <Input label={'Address Line 1'} type={'text'} required={true} placeholder={'Mushrifah Dist., '} />
                        <Input label={'Address Line 2'} type={'text'} required={true} placeholder={'Mushrifah Dist., '} />
                        <Input label={'Landmark'} type={'text'} placeholder={'Near Central Park@gmail.com'} />
                        <Input label={'City'} type={'text'} required={true} placeholder={'Jeddah '} />
                        <div className='values_form_input_Wrapper edit_profile_input_wrapper'>
                            <label>State<span>*</span></label>
                            <select>
                                <option>Jeddah</option>
                            </select>
                        </div>
                        <Input label={'Postal Code'} type={'text'} required={true} placeholder={'1966'} />

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

                            <Button children={'Add'} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditProfile
