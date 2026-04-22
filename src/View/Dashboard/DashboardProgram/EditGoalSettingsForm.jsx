import React, { useState, useEffect } from 'react'
import Input from '../../../Components/Inputs/Input'
import Textarea from '../../../Components/Inputs/Textarea'
import Button from '../../../Components/Button/Button'
import SubgoalForm from './SubgoalForm'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { updateGoalSettings } from '../../../utils/program'
import PrevSubmit from '../../../Components/PrevSubmit/PrevSubmit'
import Loaders from '../../../Components/Loaders/Loaders'

const EditGoalSettingForm = ({ goalsettingsContent, goalId, seteditGoal, setgoalSettingsContent }) => {
    const { enrollmentId } = useParams()
    const [loading, setloading] = useState(false)
    const [enableSubgoal, setenableSubgoal] = useState(false)

    // ── Main goal state ──────────────────────────────────────────────────────
    const [mainGoal, setMainGoal] = useState({
        goal_name: '',
        goal_type: '',
        start_date: '',
        duration_value: '',
        duration_unit: '',
        why_important: '',
        measurable_outcome: '',
        motivation: '',
        reward: '',
        next_step: ''
    })

    // ── Sub goals state ──────────────────────────────────────────────────────
    const [subGoals, setSubGoals] = useState([])

    const emptySubGoal = {
        id: '',
        sub_goal_name: '',
        goal_type: '',
        start_date: '',
        end_date: '',
        motivation: '',
        reward: '',
        next_step: ''
    }

    // ── Populate state from goalsettingsContent using goalId ─────────────────
    useEffect(() => {
        if (!goalId || !goalsettingsContent?.goals) return

        // find the single goal by goalId
        const singleGoal = goalsettingsContent?.goals?.find(g => g?.id === goalId)

        if (!singleGoal) return

        // populate main goal state
        setMainGoal({
            goal_name: singleGoal?.goal_name || '',
            goal_type: singleGoal?.goal_type || '',
            start_date: singleGoal?.start_date || '',
            duration_value: singleGoal?.duration_value || '',
            duration_unit: singleGoal?.duration_unit || '',
            why_important: singleGoal?.why_important || '',
            measurable_outcome: singleGoal?.measurable_outcome || '',
            motivation: singleGoal?.motivation || '',
            reward: singleGoal?.reward || '',
            next_step: singleGoal?.next_step || ''
        })

        // populate sub goals state if any exist
        if (singleGoal?.sub_goals?.length > 0) {
            setenableSubgoal(true)
            setSubGoals(singleGoal?.sub_goals?.map(sg => ({
                id: sg?.id,
                sub_goal_name: sg?.sub_goal_name || '',
                goal_type: sg?.goal_type || '',
                start_date: sg?.start_date || '',
                end_date: sg?.end_date || '',
                motivation: sg?.motivation || '',
                reward: sg?.reward || '',
                next_step: sg?.next_step || ''
            })))
        } else {
            setenableSubgoal(false)
            setSubGoals([])
        }

    }, [goalId, goalsettingsContent])

    // ── Main goal onChange ───────────────────────────────────────────────────
    const handleMainGoalChange = (e) => {
        const { name, value } = e.target
        setMainGoal({ ...mainGoal, [name]: value })
    }

    // ── Add a new empty sub goal ─────────────────────────────────────────────
    const handleAddSubGoal = () => {
        const newSubGoal = { ...emptySubGoal, id: Date.now() }
        setSubGoals([...subGoals, newSubGoal])
    }

    // ── Remove a sub goal by its local id ───────────────────────────────────
    const handleRemoveSubGoal = (localId) => {
        setSubGoals(subGoals?.filter(sg => sg?.id !== localId))
    }

    // ── Update a specific sub goal's field ───────────────────────────────────
    const handleSubGoalChange = (localId, name, value) => {
        setSubGoals(subGoals?.map(sg =>
            sg?.id === localId ? { ...sg, [name]: value } : sg
        ))
    }

    // ── Submit ───────────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault()
        setloading(true)

        // ── Main goal checks ─────────────────────────────────────────────────
        if (!mainGoal?.goal_name) { setloading(false); return toast.error('Please enter goal name') }
        if (!mainGoal?.goal_type) { setloading(false); return toast.error('Please select goal type') }
        if (!mainGoal?.start_date) { setloading(false); return toast.error('Please select start date') }
        if (!mainGoal?.duration_value) { setloading(false); return toast.error('Please enter duration value') }
        if (!mainGoal?.duration_unit) { setloading(false); return toast.error('Please select duration unit') }
        if (!mainGoal?.why_important) { setloading(false); return toast.error('Please enter why it is important') }
        if (!mainGoal?.measurable_outcome) { setloading(false); return toast.error('Please enter measurable outcome') }
        if (!mainGoal?.motivation) { setloading(false); return toast.error('Please enter motivation') }
        if (!mainGoal?.reward) { setloading(false); return toast.error('Please enter reward') }
        if (!mainGoal?.next_step) { setloading(false); return toast.error('Please enter next step') }

        // ── FormData ─────────────────────────────────────────────────────────
        const formData = new FormData()

        formData.append('goal_name', mainGoal?.goal_name)
        formData.append('goal_type', mainGoal?.goal_type)
        formData.append('start_date', mainGoal?.start_date)
        formData.append('duration_value', mainGoal?.duration_value)
        formData.append('duration_unit', mainGoal?.duration_unit)
        formData.append('why_important', mainGoal?.why_important)
        formData.append('measurable_outcome', mainGoal?.measurable_outcome)
        formData.append('motivation', mainGoal?.motivation)
        formData.append('reward', mainGoal?.reward)
        formData.append('next_step', mainGoal?.next_step)

        // ── Sub goal checks + append ──────────────────────────────────────────
        if (enableSubgoal && subGoals?.length > 0) {
            for (let index = 0; index < subGoals?.length; index++) {
                const sg = subGoals[index]
                const num = index + 1

                if (!sg?.sub_goal_name) { setloading(false); return toast.error(`Sub goal ${num}: Please enter sub goal name`) }
                if (!sg?.goal_type) { setloading(false); return toast.error(`Sub goal ${num}: Please select goal type`) }
                if (!sg?.start_date) { setloading(false); return toast.error(`Sub goal ${num}: Please select start date`) }
                if (!sg?.end_date) { setloading(false); return toast.error(`Sub goal ${num}: Please select end date`) }
                if (!sg?.motivation) { setloading(false); return toast.error(`Sub goal ${num}: Please enter motivation`) }
                if (!sg?.reward) { setloading(false); return toast.error(`Sub goal ${num}: Please enter reward`) }
                if (!sg?.next_step) { setloading(false); return toast.error(`Sub goal ${num}: Please enter next step`) }

                formData.append(`sub_goals[${index}][sub_goal_name]`, sg?.sub_goal_name)
                formData.append(`sub_goals[${index}][goal_type]`, sg?.goal_type)
                formData.append(`sub_goals[${index}][start_date]`, sg?.start_date)
                formData.append(`sub_goals[${index}][end_date]`, sg?.end_date)
                formData.append(`sub_goals[${index}][motivation]`, sg?.motivation)
                formData.append(`sub_goals[${index}][reward]`, sg?.reward)
                formData.append(`sub_goals[${index}][next_step]`, sg?.next_step)
            }
        }

        const res = await updateGoalSettings(enrollmentId, goalsettingsContent?.program_structure_id, goalId, formData)
        if(res?.success){
            setgoalSettingsContent(res?.data)
            seteditGoal(false)
        }
        setloading(false)
    }

    return (
        <>
            {loading && <Loaders />}
            <PrevSubmit previousButton={true} firstStep={false} onPrevious={(()=>seteditGoal(false))} lastStep={true} onSumbit={handleSubmit} objective={'Edit your goal'} title={'Edit Goal:'} />

            <form className='values_form_wrapper' style={{ marginTop: '-25px' }}>

                {/* ── Goal Name ── */}
                <div className='values_form_input_Wrapper'>
                    <Input
                        label={'Goal Name'}
                        required={true}
                        placeholder={"Goal 1"}
                        name='goal_name'
                        value={mainGoal?.goal_name}
                        onChange={handleMainGoalChange}
                    />
                </div>

                {/* ── Goal Type ── */}
                <div className='values_form_input_Wrapper' style={{ marginTop: '0px' }}>
                    <label style={{ margin: '20px 15px 10px 15px' }}>Goal Type <span>*</span></label>
                    <ul className='values_checkbox_button' style={{ flexDirection: 'row', gap: '20px', marginTop: '0px' }}>
                        <li className='values_checkbox_wrapper'>
                            <input
                                type='radio'
                                name='goal_type'
                                value='short_term'
                                checked={mainGoal?.goal_type === 'short_term'}
                                onChange={handleMainGoalChange}
                                style={{ width: '15px', height: '15px' }}
                            />
                            <p>Short term</p>
                        </li>
                        <li className='values_checkbox_wrapper'>
                            <input
                                type='radio'
                                name='goal_type'
                                value='long_term'
                                checked={mainGoal?.goal_type === 'long_term'}
                                onChange={handleMainGoalChange}
                                style={{ width: '15px', height: '15px' }}
                            />
                            <p>Long term</p>
                        </li>
                    </ul>
                </div>

                {/* ── Start Date + Duration ── */}
                <div className='values_form_grid_wrapper'>
                    <div className='values_form_input_Wrapper'>
                        <Input
                            label={'Start Date'}
                            required={true}
                            type={'date'}
                            name='start_date'
                            value={mainGoal?.start_date}
                            onChange={handleMainGoalChange}
                        />
                    </div>

                    <div className='values_form_input_Wrapper'>
                        <Input
                            label={'Duration Value'}
                            required={true}
                            type={'number'}
                            placeholder={'e.g. 1, 2, 3'}
                            name='duration_value'
                            value={mainGoal?.duration_value}
                            onChange={handleMainGoalChange}
                        />
                    </div>

                    <div className='values_form_input_Wrapper'>
                        <label>Duration Unit <span>*</span></label>
                        <select
                            name='duration_unit'
                            value={mainGoal?.duration_unit}
                            onChange={handleMainGoalChange}
                        >
                            <option value=''>--select--</option>
                            <option value='week'>Week</option>
                            <option value='month'>Month</option>
                            <option value='year'>Year</option>
                        </select>
                    </div>
                </div>

                {/* ── Why Important ── */}
                <div className='values_form_input_Wrapper'>
                    <Textarea
                        style={{ height: '100px' }}
                        label={'Why is it important?'}
                        required={true}
                        placeholder={"Enter details"}
                        name='why_important'
                        value={mainGoal?.why_important}
                        onChange={handleMainGoalChange}
                    />
                </div>

                {/* ── Measurable Outcome ── */}
                <div className='values_form_input_Wrapper'>
                    <Textarea
                        style={{ height: '100px' }}
                        label={'Measurable Outcome'}
                        required={true}
                        placeholder={"Enter details"}
                        name='measurable_outcome'
                        value={mainGoal?.measurable_outcome}
                        onChange={handleMainGoalChange}
                    />
                </div>

                {/* ── Motivation ── */}
                <div className='values_form_input_Wrapper'>
                    <Textarea
                        style={{ height: '100px' }}
                        label={'Motivation'}
                        required={true}
                        placeholder={"Enter details"}
                        name='motivation'
                        value={mainGoal?.motivation}
                        onChange={handleMainGoalChange}
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
                        value={mainGoal?.reward}
                        onChange={handleMainGoalChange}
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
                        value={mainGoal?.next_step}
                        onChange={handleMainGoalChange}
                    />
                </div>

                {/* ── Enable Sub Goal Toggle ── */}
                <div className='enable_sub_goal_wrapper'>
                    <h4>Enable Sub Goal</h4>
                    <div
                        className='toggle_wrapper'
                        style={enableSubgoal ? { background: 'var(--primary-color)' } : {}}
                        onClick={() => setenableSubgoal(!enableSubgoal)}
                    >
                        {enableSubgoal && <i className="fa-solid fa-check"></i>}
                        <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#fff' }}></div>
                        {!enableSubgoal && <i className="fa-solid fa-xmark"></i>}
                    </div>
                </div>

                {/* ── Sub Goals Section ── */}
                {enableSubgoal && (
                    <>
                        <Button
                            styles={{
                                background: 'transparent',
                                border: '1px solid var(--primary-color)',
                                color: 'var(--text-color)',
                                display: 'block',
                                marginLeft: 'auto'
                            }}
                            type='button'
                            onClick={handleAddSubGoal}
                        >
                            Add Sub Goal
                        </Button>

                        {subGoals?.map((sg) => (
                            <SubgoalForm
                                key={sg?.id}
                                subGoal={sg}
                                mainGoalStartDate={mainGoal?.start_date}
                                onChange={(name, value) => handleSubGoalChange(sg?.id, name, value)}
                                onRemove={() => handleRemoveSubGoal(sg?.id)}
                            />
                        ))}
                    </>
                )}

            </form>
        </>
    )
}

export default EditGoalSettingForm