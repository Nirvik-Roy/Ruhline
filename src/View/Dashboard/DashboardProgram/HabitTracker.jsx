import React from 'react'
import Input from '../../../Components/Inputs/Input'
import Textarea from '../../../Components/Inputs/Textarea'
import Button from '../../../Components/Button/Button'
const HabitTracker = ({ completedFunction }) => {
    return (
        <>
            <div className='values_head'>
                <h4><span>Habit Tracker</span></h4>


            </div>

            <form className='values_form_wrapper' style={{
                marginTop: '-25px'
            }}>

                <div className='values_form_input_Wrapper'>
                    <label>Select Habit type <span>*</span></label>
                    <select>
                        <option>Habit type 1</option>
                    </select>
                </div>

                <div className='values_form_input_Wrapper'>
                    <Input label={'Habit Name'} required={true} placeholder={"Goal 1"} />
                </div>

                <div className='values_form_input_Wrapper' style={{
                    marginTop: '0px'
                }}>
                    <label style={{
                        margin: '20px 15px 10px 15px',
                    }}>Enter frequency<span>*</span></label>
                    <ul className='values_checkbox_button' style={{
                        flexDirection: 'row',
                        gap: '20px',
                        margin: '0 0'
                    }}>
                        <li className='values_checkbox_wrapper'>
                            <input type='radio' style={{
                                width: '15px',
                                height: '15px'
                            }} />
                            <p>Daily</p>
                        </li>

                        <li className='values_checkbox_wrapper'>
                            <input type='radio' style={{
                                width: '15px',
                                height: '15px'
                            }} />
                            <p>Weekly</p>
                        </li>


                        <li className='values_checkbox_wrapper'>
                            <input type='radio' style={{
                                width: '15px',
                                height: '15px'
                            }} />
                            <p>Monthly</p>
                        </li>
                    </ul>
                </div>
                <div className='values_form_grid_wrapper' style={{
                    gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr)'
                }}>
                    <div className='values_form_input_Wrapper'>
                        <Input label={'Limit'} required={true} defaultValue={'20'} />
                    </div>

                    <div className='values_form_input_Wrapper'>
                        <label>Combine with goal <span>*</span></label>
                        <select>
                            <option>Goal 1</option>
                        </select>
                    </div>


                    <div className='values_form_input_Wrapper'>
                        <Input label={'Limit'} required={true} type={'time'} />
                    </div>

                </div>
                <div onClick={(() => completedFunction(6))} style={{
                    marginTop: '30px',
                }}>
                    <Button children={'Submit'} />
                </div>
            </form>
        </>
    )
}

export default HabitTracker
