import React from 'react'
import Input from '../../../Components/Inputs/Input'
import Textarea from '../../../Components/Inputs/Textarea'
import Button from '../../../Components/Button/Button'
const GoalSetting = ({ completedFunction }) => {
    return (
        <>
            <div className='values_head'>
                <h4><span>Goal Settings:</span> Create your own goal </h4>
            </div>

            <form className='values_form_wrapper' style={{
                marginTop: '-25px'
            }}>

                <div className='values_form_input_Wrapper'>
                    <Input label={'Goal Name'} required={true} placeholder={"Goal 1"} />
                </div>

                <div className='values_form_input_Wrapper' style={{
                    marginTop: '0px'
                }}>
                    <ul className='values_checkbox_button' style={{
                        flexDirection: 'row',
                        gap: '20px'
                    }}>
                        <li className='values_checkbox_wrapper'>
                            <input type='radio' style={{
                                width: '15px',
                                height: '15px'
                            }} />
                            <p>Short term</p>
                        </li>

                        <li className='values_checkbox_wrapper'>
                            <input type='radio' style={{
                                width: '15px',
                                height: '15px'
                            }} />
                            <p>Long term</p>
                        </li>
                    </ul>
                </div>
                <div className='values_form_grid_wrapper'>
                    <div className='values_form_input_Wrapper'>
                        <Input label={'Start Date'} required={true} type={'date'} placeholder={"Goal 1"} />
                    </div>

                    <div className='values_form_input_Wrapper'>
                        <label>Duration Selection <span>*</span></label>
                        <select>
                            <option>1 week</option>
                        </select>
                    </div>
                </div>

                <div className='values_form_input_Wrapper'>
                    <Textarea label={' Write about yourself'} required={true} placeholder={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "} />
                </div>


                <div className='values_form_input_Wrapper'>
                    <Textarea label={' Why is it important?'} required={true} placeholder={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "} />
                </div>
                <div onClick={(() => completedFunction(4))} style={{
                    marginTop: '30px',
                }}>
                    <Button children={'Submit'} />
                </div>
            </form>
        </>
    )
}

export default GoalSetting
