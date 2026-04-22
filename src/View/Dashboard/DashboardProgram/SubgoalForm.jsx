import React from 'react'
import Input from '../../../Components/Inputs/Input.jsx'
import Textarea from '../../../Components/Inputs/Textarea'
import crossIcon from '../../../assets/Images/content.svg'

const SubgoalForm = ({ subGoal, onChange, onRemove, mainGoalStartDate }) => {

    // ── Generic onChange — sends name + value up to parent ──────────────────
    const handleChange = (e) => {
        const { name, value } = e.target
        onChange(name, value)
    }

    return (
        <form className='values_form_wrapper' style={{
            border: '1px solid #ccc',
            borderRadius: '15px',
            padding: '25px',
            marginTop: '30px',
            position: 'relative'
        }}>

            {/* ── Remove this sub goal ── */}
            <img
                src={crossIcon}
                style={{ position: 'absolute', top: '10px', right: '10px', width: '30px', cursor: 'pointer' }}
                onClick={onRemove}
            />

            {/* ── Sub Goal Name ── */}
            <div style={{ marginTop: '30px' }} className='values_form_input_Wrapper'>
                <Input
                    label={'Sub Goal Name'}
                    required={true}
                    placeholder={"Enter sub goal name"}
                    name='sub_goal_name'
                    value={subGoal?.sub_goal_name}
                    onChange={handleChange}
                />
            </div>

            {/* ── Goal Type ── */}
            <div className='values_form_input_Wrapper' style={{ marginTop: '0px' }}>
                <label style={{ margin: '20px 15px 10px 15px' }}>Goal Type <span>*</span></label>
                <ul className='values_checkbox_button' style={{ flexDirection: 'row', gap: '20px',marginTop:'0px'}}>
                    <li className='values_checkbox_wrapper'>
                        <input
                            type='radio'
                            name='goal_type'
                            value='short_term'
                            checked={subGoal?.goal_type === 'short_term'}
                            onChange={handleChange}
                            style={{ width: '15px', height: '15px' }}
                        />
                        <p>Short term</p>
                    </li>
                    <li className='values_checkbox_wrapper'>
                        <input
                            type='radio'
                            name='goal_type'
                            value='long_term'
                            checked={subGoal?.goal_type === 'long_term'}
                            onChange={handleChange}
                            style={{ width: '15px', height: '15px' }}
                        />
                        <p>Long term</p>
                    </li>
                </ul>
            </div>

            {/* ── Start Date + End Date ── */}
            <div className='values_form_grid_wrapper'>
                <div className='values_form_input_Wrapper'>
                    <Input
                        label={'Start Date'}
                        required={true}
                        type={'date'}
                        name='start_date'
                        value={subGoal?.start_date}
                        min={mainGoalStartDate}
                        onChange={handleChange}
                    />
                </div>
                <div className='values_form_input_Wrapper'>
                    <Input
                        label={'End Date'}
                        required={true}
                        type={'date'}
                        name='end_date'
                        value={subGoal?.end_date}
                        min={subGoal?.start_date}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* ── Motivation ── */}
            <div className='values_form_input_Wrapper'>
                <Textarea
                    style={{ height: '100px' }}
                    label={'Motivation'}
                    required={true}
                    placeholder={"Enter details"}
                    name='motivation'
                    value={subGoal?.motivation}
                    onChange={handleChange}
                />
            </div>

            {/* ── Reward ── */}
            <div className='values_form_input_Wrapper'>
                <Textarea
                    style={{ height: '100px' }}
                    label={'Reward'}
                    required={true}
                    placeholder={"Enter details"}
                    name='reward'
                    value={subGoal?.reward}
                    onChange={handleChange}
                />
            </div>

            {/* ── Next Step ── */}
            <div className='values_form_input_Wrapper'>
                <Textarea
                    style={{ height: '100px' }}
                    label={'Next Step'}
                    required={true}
                    placeholder={"Enter details"}
                    name='next_step'
                    value={subGoal?.next_step}
                    onChange={handleChange}
                />
            </div>

        </form>
    )
}

export default SubgoalForm