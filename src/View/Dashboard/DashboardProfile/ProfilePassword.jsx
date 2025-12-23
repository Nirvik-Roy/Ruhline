import React from 'react'
import eye from '../../../assets/Images/Union (3).png'
import tick from '../../../assets/Images/Union (4).png'
import Button from '../../../Components/Button/Button'
const ProfilePassword = () => {
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
                            }}>Change Password</h3>
                        </div>
                    </div>
                </div>
                <form className='modal_form'>
                    <div className='input_form' style={{
                        position: 'relative'
                    }}>
                        <label> Password <span>*</span></label>
                        <input style={{
                            padding: '0 40px 0 15px '
                        }} type='password' placeholder='*********' />
                        <img style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} src={eye} />

                    </div>
                    <div className='input_form' style={{
                        position: 'relative'
                    }}>
                        <label>Confirm Password <span>*</span></label>
                        <input style={{
                            padding: '0 40px 0 15px '
                        }} type='password' placeholder='*********' />
                        <img style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} src={eye} />

                        <img style={{
                            position: 'absolute',
                            top: '50px',
                            right: '40px',
                            width: '15px',
                            cursor: 'pointer'
                        }} src={tick} />
                        <small style={{
                            marginLeft: '15px',
                            fontSize: '11px'
                        }}>8+ characters</small>
                    </div>

                    <div className='cancel_select_button_wrapper' style={{
                        marginTop: '30px'
                    }}>

                        <button>Cancel</button>
                        <div>

                            <Button children={'Change'} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ProfilePassword
