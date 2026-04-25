import React, { useState, useEffect } from 'react'
import Input from '../../../Components/Inputs/Input'
import Textarea from '../../../Components/Inputs/Textarea'
import Button from '../../../Components/Button/Button'
import PrevSubmit from '../../../Components/PrevSubmit/PrevSubmit'
import toast from 'react-hot-toast'
import Loaders from '../../../Components/Loaders/Loaders'
import { updateHabit } from '../../../utils/program'
import { useParams } from 'react-router-dom'

const UpdateHabittrackerForm = ({ habbitContent, sethabbitContent, habitId, seteditHabit }) => {
    const [loading, setloading] = useState(false)
    const { enrollmentId } = useParams()

    const [inputData, setInputData] = useState({
        "habit_type_id": '',
        "linked_goal_id": '',
        "habit_name": "",
        "frequency_unit": "",
        "frequency_interval": '',
        "days_of_week": [],
        "monthly_mode": '',
        "day_of_month": '',
        "week_of_month": '',
        "monthly_day_of_week": '',
        "start_date": "",
        "end_date": '',
        "target_count": '',
        "target_period": "",
        "reminder_time": "",
    })

    // ─── Populate state from habbitContent using habitId ─────────────────────
    useEffect(() => {
        if (!habitId || !habbitContent?.habits) return

        const singleHabit = habbitContent?.habits?.find(h => h?.id === habitId)

        if (!singleHabit) return

        setInputData({
            habit_type_id: singleHabit?.habit_type_id || '',
            linked_goal_id: singleHabit?.linked_goal_id || '',
            habit_name: singleHabit?.habit_name || '',
            frequency_unit: singleHabit?.frequency_unit || '',
            frequency_interval: singleHabit?.frequency_interval || '',
            days_of_week: singleHabit?.days_of_week || [],
            monthly_mode: singleHabit?.monthly_mode || '',
            day_of_month: singleHabit?.day_of_month || '',
            week_of_month: singleHabit?.week_of_month || '',
            monthly_day_of_week: singleHabit?.monthly_day_of_week || '',
            start_date: singleHabit?.start_date || '',
            end_date: singleHabit?.end_date || '',
            target_count: singleHabit?.target_count || '',
            target_period: singleHabit?.target_period || '',
            reminder_time: singleHabit?.reminder_time ? singleHabit?.reminder_time?.slice(0, 5) : ''
        })

    }, [habitId, habbitContent])

    // ─── Show/hide conditions ─────────────────────────────────────────────────
    const isWeekly = inputData?.frequency_unit === 'week'
    const isMonthly = inputData?.frequency_unit === 'month'
    const isDayOfMonth = isMonthly && inputData?.monthly_mode === 'day_of_month'
    const isWeekdayOfMonth = isMonthly && inputData?.monthly_mode === 'weekday_of_month'

    // ─── Generic handler ──────────────────────────────────────────────────────
    const handleChange = (e) => {
        const { name, value } = e.target
        setInputData(prev => ({ ...prev, [name]: value }))
    }

    // ─── Frequency unit handler ───────────────────────────────────────────────
    const handleFrequencyUnitChange = (e) => {
        const value = e.target.value
        setInputData(prev => ({
            ...prev,
            frequency_unit: value,
            days_of_week: [],
            monthly_mode: '',
            day_of_month: '',
            week_of_month: '',
            monthly_day_of_week: ''
        }))
    }

    // ─── Monthly mode handler ─────────────────────────────────────────────────
    const handleMonthlyModeChange = (e) => {
        const value = e.target.value
        setInputData(prev => ({
            ...prev,
            monthly_mode: value,
            day_of_month: '',
            week_of_month: '',
            monthly_day_of_week: ''
        }))
    }

    // ─── Days of week handler ─────────────────────────────────────────────────
    const handleDaysOfWeekChange = (e) => {
        const value = e.target.value
        const checked = e.target.checked

        let updatedDays = [...inputData.days_of_week]

        if (checked) {
            updatedDays.push(value)
        } else {
            updatedDays = updatedDays.filter(d => d !== value)
        }

        setInputData({ ...inputData, days_of_week: updatedDays })
    }

    // ─── Submit ───────────────────────────────────────────────────────────────
    const handleSubmit = async () => {
        setloading(true)

        // ── Core field checks ────────────────────────────────────────────────
        if (!inputData?.habit_type_id) { setloading(false); return toast.error('Please select habit type') }
        if (!inputData?.linked_goal_id) { setloading(false); return toast.error('Please select a linked goal') }
        if (!inputData?.habit_name) { setloading(false); return toast.error('Please enter habit name') }
        if (!inputData?.frequency_unit) { setloading(false); return toast.error('Please select frequency unit') }
        if (!inputData?.frequency_interval) { setloading(false); return toast.error('Please enter frequency interval') }
        if (!inputData?.start_date) { setloading(false); return toast.error('Please select start date') }
        if (!inputData?.target_count) { setloading(false); return toast.error('Please enter target count') }
        if (!inputData?.target_period) { setloading(false); return toast.error('Please select target period') }
        if (!inputData?.reminder_time) { setloading(false); return toast.error('Please select reminder time') }

        // ── Weekly checks ────────────────────────────────────────────────────
        if (inputData?.frequency_unit === 'week') {
            if (!inputData?.days_of_week?.length > 0) { setloading(false); return toast.error('Please select at least one day of week') }
        }

        // ── Monthly checks ───────────────────────────────────────────────────
        if (inputData?.frequency_unit === 'month') {
            if (!inputData?.monthly_mode) { setloading(false); return toast.error('Please select monthly mode') }

            if (inputData?.monthly_mode === 'day_of_month') {
                if (!inputData?.day_of_month) { setloading(false); return toast.error('Please enter day of month') }
            }

            if (inputData?.monthly_mode === 'weekday_of_month') {
                if (!inputData?.week_of_month) { setloading(false); return toast.error('Please select week of month') }
                if (!inputData?.monthly_day_of_week) { setloading(false); return toast.error('Please select day of week') }
            }
        }

        // ── FormData ─────────────────────────────────────────────────────────
        const formData = new FormData()

        formData.append('habit_type_id', inputData?.habit_type_id)
        formData.append('linked_goal_id', inputData?.linked_goal_id)
        formData.append('habit_name', inputData?.habit_name)
        formData.append('frequency_unit', inputData?.frequency_unit)
        formData.append('frequency_interval', inputData?.frequency_interval)
        formData.append('start_date', inputData?.start_date)
        if (inputData?.end_date) formData.append('end_date', inputData?.end_date)
        formData.append('target_count', inputData?.target_count)
        formData.append('target_period', inputData?.target_period)
        formData.append('reminder_time', inputData?.reminder_time)
        formData.append('timezone', 'Asia/Kolkata')

        if (inputData?.frequency_unit === 'week') {
            inputData?.days_of_week?.forEach(day => {
                formData.append('days_of_week[]', day)
            })
        }

        if (inputData?.frequency_unit === 'month') {
            formData.append('monthly_mode', inputData?.monthly_mode)

            if (inputData?.monthly_mode === 'day_of_month') {
                formData.append('day_of_month', inputData?.day_of_month)
            }

            if (inputData?.monthly_mode === 'weekday_of_month') {
                formData.append('week_of_month', inputData?.week_of_month)
                formData.append('monthly_day_of_week', inputData?.monthly_day_of_week)
            }
        }

        const res = await updateHabit(enrollmentId, habbitContent?.program_structure_id, habitId, formData)

        if (res?.success) {
            sethabbitContent(res?.data)
            seteditHabit(false)
        }

        setloading(false)
    }

    return (
        <>
          
            <PrevSubmit loading={loading} loadingText={'Loading...'} onPrevious={(() => seteditHabit(false))} onSumbit={handleSubmit} title={'Edit Habit'} previousButton={true} firstStep={false} lastStep={true} />

            <form className='values_form_wrapper' style={{ marginTop: '-25px' }}>

                {/* ── Habit Type ── */}
                <div className='values_form_input_Wrapper'>
                    <label>Select Habit type <span>*</span></label>
                    <select
                        name='habit_type_id'
                        value={inputData?.habit_type_id}
                        onChange={handleChange}
                    >
                        <option value=''>--select-habit-types--</option>
                        {habbitContent?.options?.habit_types?.map((element) => (
                            <option key={element?.id} value={element?.id}>
                                {element?.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ── Habit Name ── */}
                <div className='values_form_input_Wrapper'>
                    <Input
                        label={'Habit Name'}
                        required={true}
                        placeholder={"Enter habit name"}
                        name='habit_name'
                        value={inputData?.habit_name}
                        onChange={handleChange}
                    />
                </div>

                {/* ── Linked Goal ── */}
                <div className='values_form_input_Wrapper'>
                    <label>Combine with goal <span>*</span></label>
                    <select
                        name='linked_goal_id'
                        value={inputData?.linked_goal_id}
                        onChange={handleChange}
                    >
                        <option value=''>--select-goal--</option>
                        {habbitContent?.options?.goal_options?.map((element) => (
                            <option key={element?.id} value={element?.id}>
                                {element?.goal_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ── Frequency Unit ── */}
                <div className='values_form_input_Wrapper' style={{ marginTop: '0px' }}>
                    <label style={{ margin: '20px 15px 10px 15px' }}>
                        Frequency Unit <span>*</span>
                    </label>
                    <ul className='values_checkbox_button' style={{ flexDirection: 'row', gap: '20px', margin: '0 0' }}>
                        {habbitContent?.options?.frequency_units?.map((element) => (
                            <li key={element} className='values_checkbox_wrapper'>
                                <input
                                    name='frequency_unit'
                                    value={element}
                                    type='radio'
                                    checked={inputData?.frequency_unit === element}
                                    onChange={handleFrequencyUnitChange}
                                    style={{ width: '15px', height: '15px' }}
                                />
                                <p style={{ textTransform: 'capitalize' }}>{element}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ── Frequency Interval ── */}
                <div className='values_form_input_Wrapper'>
                    <Input
                        label={'Frequency Interval'}
                        type={'number'}
                        required={true}
                        placeholder={"Enter frequency interval (e.g. 1, 2, 3)"}
                        name='frequency_interval'
                        value={inputData?.frequency_interval}
                        onChange={handleChange}
                    />
                </div>

                {/* ── Days of Week (only when weekly) ── */}
                {isWeekly && (
                    <div className='values_form_input_Wrapper' style={{ marginTop: '0px' }}>
                        <label style={{ margin: '20px 15px 10px 15px' }}>
                            Days of Week <span>*</span>
                        </label>
                        <ul className='values_checkbox_button' style={{ flexDirection: 'row', gap: '20px', margin: '0 0', flexWrap: 'wrap' }}>
                            {habbitContent?.options?.weekdays?.map((element) => (
                                <li key={element} className='values_checkbox_wrapper'>
                                    <input
                                        name='days_of_week'
                                        value={element}
                                        type='checkbox'
                                        checked={inputData?.days_of_week?.includes(element)}
                                        onChange={handleDaysOfWeekChange}
                                        style={{ width: '15px', height: '15px' }}
                                    />
                                    <p style={{ textTransform: 'capitalize' }}>{element}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* ── Monthly Mode (only when monthly) ── */}
                {isMonthly && (
                    <div className='values_form_input_Wrapper' style={{ marginTop: '0px' }}>
                        <label style={{ margin: '20px 15px 10px 15px' }}>
                            Monthly Mode <span>*</span>
                        </label>
                        <ul className='values_checkbox_button' style={{ flexDirection: 'row', gap: '20px', margin: '0 0' }}>
                            {habbitContent?.options?.monthly_modes?.map((element) => (
                                <li key={element} className='values_checkbox_wrapper'>
                                    <input
                                        name='monthly_mode'
                                        value={element}
                                        type='radio'
                                        checked={inputData?.monthly_mode === element}
                                        onChange={handleMonthlyModeChange}
                                        style={{ width: '15px', height: '15px' }}
                                    />
                                    <p style={{ textTransform: 'capitalize' }}>
                                        {element === 'day_of_month' ? 'By Date' : 'By Weekday Position'}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* ── Day of Month ── */}
                {isDayOfMonth && (
                    <div className='values_form_input_Wrapper'>
                        <Input
                            placeholder={'Enter day of month (1-31)'}
                            type={'number'}
                            label={'Day of Month'}
                            required={true}
                            name='day_of_month'
                            value={inputData?.day_of_month}
                            onChange={handleChange}
                        />
                    </div>
                )}

                {/* ── Week of Month + Monthly Day of Week ── */}
                {isWeekdayOfMonth && (
                    <>
                        <div className='values_form_input_Wrapper'>
                            <label>Week of Month <span>*</span></label>
                            <select
                                style={{ textTransform: 'capitalize' }}
                                name='week_of_month'
                                value={inputData?.week_of_month}
                                onChange={handleChange}
                            >
                                <option value=''>--select-week--</option>
                                {habbitContent?.options?.week_of_month_options?.map((element) => (
                                    <option key={element} style={{ textTransform: 'capitalize' }} value={element}>
                                        {element}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='values_form_input_Wrapper'>
                            <label>Day of Week <span>*</span></label>
                            <select
                                style={{ textTransform: 'capitalize' }}
                                name='monthly_day_of_week'
                                value={inputData?.monthly_day_of_week}
                                onChange={handleChange}
                            >
                                <option value=''>--select-day--</option>
                                {habbitContent?.options?.weekdays?.map((element) => (
                                    <option key={element} style={{ textTransform: 'capitalize' }} value={element}>
                                        {element}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}

                {/* ── Bottom Grid ── */}
                <div className='values_form_grid_wrapper' style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr)' }}>

                    <div className='values_form_input_Wrapper'>
                        <Input
                            placeholder={'Enter start date'}
                            type={'date'}
                            label={'Start Date'}
                            required={true}
                            name='start_date'
                            value={inputData?.start_date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='values_form_input_Wrapper'>
                        <Input
                            placeholder={'Enter end date (optional)'}
                            type={'date'}
                            label={'End Date'}
                            name='end_date'
                            value={inputData?.end_date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='values_form_input_Wrapper'>
                        <Input
                            placeholder={'Enter target count'}
                            type={'number'}
                            label={'Target Count'}
                            required={true}
                            name='target_count'
                            value={inputData?.target_count}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='values_form_input_Wrapper'>
                        <label>Target Period <span>*</span></label>
                        <select
                            style={{ textTransform: 'capitalize' }}
                            name='target_period'
                            value={inputData?.target_period}
                            onChange={handleChange}
                        >
                            <option value=''>--select-target-period--</option>
                            {habbitContent?.options?.target_periods?.map((element) => (
                                <option key={element} style={{ textTransform: 'capitalize' }} value={element}>
                                    {element}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='values_form_input_Wrapper'>
                        <Input
                            label={'Reminder Time'}
                            required={true}
                            type={'time'}
                            name='reminder_time'
                            value={inputData?.reminder_time}
                            onChange={handleChange}
                        />
                    </div>

                </div>
            </form>
        </>
    )
}

export default UpdateHabittrackerForm