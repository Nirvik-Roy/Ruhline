import React from 'react'
import Input from '../../../Components/Inputs/Input'
import Textarea from '../../../Components/Inputs/Textarea'
import Button from '../../../Components/Button/Button'
import PrevSubmit from '../../../Components/PrevSubmit/PrevSubmit'

const ValuesContent = ({ completedFunction }) => {
    return (
        <>

            <PrevSubmit title={'Values'} objective={`Question ${1} of ${5}`}/>

            <form className='values_form_wrapper'>
                <h5>Answer the Question </h5>

                <div className='values_form_input_Wrapper'>
                    <Textarea label={'1. Write about yourself'} required={true} placeholder={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "} />
                </div>


                <div className='values_form_input_Wrapper'>
                    <label>2. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? <span>*</span></label>
                    <ul className='values_checkbox_button'>
                        <li className='values_checkbox_wrapper'>
                            <input type='checkbox' />
                            <p>React Js</p>
                        </li>

                        <li className='values_checkbox_wrapper'>
                            <input type='checkbox' />
                            <p>Wordpress</p>
                        </li>


                        <li className='values_checkbox_wrapper'>
                            <input type='checkbox' />
                            <p>Python</p>
                        </li>


                        <li className='values_checkbox_wrapper'>
                            <input type='checkbox' />
                            <p>Flutter</p>
                        </li>


                        <li className='values_checkbox_wrapper'>
                            <input type='checkbox' />
                            <p>Node</p>
                        </li>
                    </ul>
                </div>

                <div className='values_form_input_Wrapper'>
                    <label>3. Have you ever used AI?<span>*</span></label>
                    <ul className='values_checkbox_button'>
                        <li className='values_checkbox_wrapper'>
                            <input type='radio' />
                            <p>Yes</p>
                        </li>

                        <li className='values_checkbox_wrapper'>
                            <input type='radio' />
                            <p>No</p>
                        </li>
                    </ul>
                    <div onClick={(() => {
                        completedFunction(1)
                    })} style={{
                        marginTop: '30px',
                    }}>
                        <Button children={'Submit'} />
                    </div>

                </div>
            </form>
        </>
    )
}

export default ValuesContent
