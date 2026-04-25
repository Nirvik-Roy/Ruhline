import React, { useState } from 'react'
import Button from '../../../Components/Button/Button'
import { Changeuserpassword } from '../../../utils/user'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { AuthlogOut } from '../../../../Store/Slices/Loginslice/AuthSlice'
import Loaders from '../../../Components/Loaders/Loaders'
const ProfilePassword = () => {
    const dispatch = useDispatch();
    const [passwordErrors, setpasswordErrors] = useState();
    const [passwordLoading, setpasswordLoading] = useState(false)
    const [formData, setformData] = useState({
        current_password: '',
        password: '',
        password_confirmation: ''
    })
    const [type, setType] = useState(false);
    const [type2, setType2] = useState(false);
    const [type3, setType3] = useState(false);
    const [passwordMsg, setPasswordMsg] = useState("");
    const [confirmPasswordMsg, setConfirmPasswordMsg] = useState("");
    const validatePasswordMsg = (password) => {
        if (!password) return "";
        if (password.length < 8) {
            return "Password must be at least 8 characters";
        }
        return "";
    };

    const validateConfirmPasswordMsg = (password, confirmPassword) => {
        if (!confirmPassword) return "";
        if (password !== confirmPassword) {
            return "Password and Confirm Password should be same";
        }
        return "";
    };
    const handleSubmitPassword = async (e) => {
        e.preventDefault()
        if (formData.current_password != '' && formData.password != '' && formData.password_confirmation != "") {
            setpasswordLoading(true)
            try {
                const result = await Changeuserpassword(formData);
                setpasswordErrors(result)
                if (result.message == "Your password has been changed successfully.") {
                    dispatch(AuthlogOut())
                }
            } catch (err) {
                console.log(err)
            } finally {
                setpasswordLoading(false)
            }
        } else {
            toast.error('Plz enter all the fields')
            setpasswordLoading(false)
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "password") {
            setPasswordMsg(validatePasswordMsg(value));
            setConfirmPasswordMsg(
                validateConfirmPasswordMsg(value, formData.password_confirmation)
            );
        }

        if (name === "password_confirmation") {
            setConfirmPasswordMsg(
                validateConfirmPasswordMsg(formData.password, value)
            );
        }
        setformData({
            ...formData,
            [name]: value
        })
    }
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
                        <label> Current Password <span>*</span></label>
                        <input onChange={handleChange} name='current_password' value={formData.current_password} style={{
                            padding: '0 40px 0 15px '
                        }} type={type ? 'text' : 'password'} placeholder='*********' />
                        {type && <i style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} class="fa-regular fa-eye" onClick={(() => setType(!type))}></i>}

                        {!type && <i style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} class="fa-regular fa-eye-slash" onClick={(() => setType(!type))}></i>}
                        <small style={{
                            marginLeft: '15px',
                            fontSize: '11px',
                            marginTop: '0px',
                            color: 'rgba(255, 0, 0, 1)',
                            cursor: 'pointer'
                        }}>{passwordErrors?.current_password && passwordErrors?.current_password[0]}</small>
                    </div>
                    <div className='input_form' style={{
                        position: 'relative'
                    }}>
                        <label> New Password <span>*</span></label>
                        <input onChange={handleChange} name='password' value={formData.password} style={{
                            padding: '0 40px 0 15px '
                        }} type={type2 ? 'text' : 'password'} placeholder='*********' />
                        {type2 && <i style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} class="fa-regular fa-eye" onClick={(() => setType2(!type2))}></i>}

                        {!type2 && <i style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} class="fa-regular fa-eye-slash" onClick={(() => setType2(!type2))}></i>}
                        <small style={{
                            marginLeft: '15px',
                            fontSize: '11px',
                            marginTop: '0px',
                            color: 'rgba(255, 0, 0, 1)',
                            cursor: 'pointer'
                        }}>{passwordErrors?.password ? passwordErrors?.password[0] : passwordMsg}</small>
                    </div>
                    <div className='input_form' style={{
                        position: 'relative'
                    }}>
                        <label>Confirm Password <span>*</span></label>
                        <input onChange={handleChange} name='password_confirmation' value={formData.password_confirmation} style={{
                            padding: '0 40px 0 15px '
                        }} type={type3 ? 'text' : 'password'} placeholder='*********' />
                        {type3 && <i style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} class="fa-regular fa-eye" onClick={(() => setType3(!type3))}></i>}

                        {!type3 && <i style={{
                            position: 'absolute',
                            top: '47px',
                            right: '10px',
                            width: '20px',
                            cursor: 'pointer'
                        }} class="fa-regular fa-eye-slash" onClick={(() => setType3(!type3))}></i>}

                        {/* <img style={{
                            position: 'absolute',
                            top: '50px',
                            right: '40px',
                            width: '15px',
                            cursor: 'pointer'
                        }} src={tick} /> */}
                        {/* <small style={{
                            marginLeft: '15px',
                            fontSize: '11px'
                        }}>8+ characters</small> */}
                        <small style={{
                            marginLeft: '15px',
                            fontSize: '11px',
                            marginTop: '0px',
                            color: 'rgba(255, 0, 0, 1)',
                            cursor: 'pointer'
                        }}>{passwordErrors?.password_confirmation ? passwordErrors?.password_confirmation[0] : confirmPasswordMsg}</small>
                    </div>

                    <div className='cancel_select_button_wrapper' style={{
                        marginTop: '30px'
                    }}>

                        <button onClick={((e)=>{
                           e.preventDefault()
                        })}>Cancel</button>
                        <div>
                            <Button styles={{
                                background:'var(--primary-color)'
                            }} loading={passwordLoading}  onClick={((e) => handleSubmitPassword(e))} children={'Change'} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ProfilePassword
