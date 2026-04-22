import React, { useState } from 'react'
import Input from '../../../Components/Inputs/Input'
import Textarea from '../../../Components/Inputs/Textarea'
import Button from '../../../Components/Button/Button'
import PrevSubmit from '../../../Components/PrevSubmit/PrevSubmit'

const HabitTracker = ({ habbitContent }) => {
    const [loading,setloading] = useState(false)
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
        "timezone": Intl.DateTimeFormat().resolvedOptions().timeZone // auto-detect from browser
    })


    // ─── Show/hide conditions ─────────────────────────────────────────────────
    const isWeekly = inputData.frequency_unit === 'week'
    const isMonthly = inputData.frequency_unit === 'month'
    const isDayOfMonth = isMonthly && inputData.monthly_mode === 'day_of_month'
    const isWeekdayOfMonth = isMonthly && inputData.monthly_mode === 'weekday_of_month'


    // ─── Generic handler for all simple inputs/selects ───────────────────────
    const handleChange = (e) => {
        const { name, value } = e.target
        setInputData(prev => ({ ...prev, [name]: value }))
    }

    // ─── Special handler for frequency_unit ──────────────────────────────────
    // When frequency unit changes, reset all frequency-related fields
    const handleFrequencyUnitChange = (e) => {
        const value = e.target.value
        setInputData(prev => ({
            ...prev,
            frequency_unit: value,
            days_of_week: [],          // reset
            monthly_mode: '',          // reset
            day_of_month: '',          // reset
            week_of_month: '',         // reset
            monthly_day_of_week: ''    // reset
        }))
    }

    // ─── Special handler for monthly_mode ────────────────────────────────────
    // When monthly mode changes, reset its sub-fields
    const handleMonthlyModeChange = (e) => {
        const value = e.target.value
        setInputData(prev => ({
            ...prev,
            monthly_mode: value,
            day_of_month: '',          // reset
            week_of_month: '',         // reset
            monthly_day_of_week: ''    // reset
        }))
    }

    // ─── Special handler for days_of_week checkboxes ─────────────────────────
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
    
    const handleSubmit = async()=>{
        setloading(false)
        const formData = new FormData()

        // ── Always append these fields ──
        formData.append('habit_type_id', inputData.habit_type_id)
        formData.append('linked_goal_id', inputData.linked_goal_id)
        formData.append('habit_name', inputData.habit_name)
        formData.append('frequency_unit', inputData.frequency_unit)
        formData.append('frequency_interval', inputData.frequency_interval)
        formData.append('start_date', inputData.start_date)
        formData.append('end_date', inputData.end_date)
        formData.append('target_count', inputData.target_count)
        formData.append('target_period', inputData.target_period)
        formData.append('reminder_time', inputData.reminder_time)
        formData.append('timezone', inputData.timezone)

        // ── If weekly → append days_of_week ──
        if (inputData.frequency_unit === 'week') {
            inputData.days_of_week.forEach(day => {
                formData.append('days_of_week[]', day)
            })
        }

        // ── If monthly → append monthly_mode first ──
        if (inputData.frequency_unit === 'month') {
            formData.append('monthly_mode', inputData.monthly_mode)

            // If monthly mode is by date → append day_of_month only
            if (inputData.monthly_mode === 'day_of_month') {
                formData.append('day_of_month', inputData.day_of_month)
            }

            // If monthly mode is by weekday → append week_of_month + monthly_day_of_week only
            if (inputData.monthly_mode === 'weekday_of_month') {
                formData.append('week_of_month', inputData.week_of_month)
                formData.append('monthly_day_of_week', inputData.monthly_day_of_week)
            }
        }


        setloading(false)
    }

    return (
        <>
            <PrevSubmit onSumbit={handleSubmit} title={'Habit Tracker'} previousButton={false} lastStep={true}/>

            <form className='values_form_wrapper' style={{ marginTop: '-25px' }}>

                {/* ── Habit Type ── */}
                <div className='values_form_input_Wrapper'>
                    <label>Select Habit type <span>*</span></label>
                    <select
                        name='habit_type_id'
                        value={inputData.habit_type_id}
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
                        value={inputData.habit_name}
                        onChange={handleChange}
                    />
                </div>

                {/* ── Linked Goal ── */}
                <div className='values_form_input_Wrapper'>
                    <label>Combine with goal <span>*</span></label>
                    <select
                        name='linked_goal_id'
                        value={inputData.linked_goal_id}
                        onChange={handleChange}
                    >
                        <option value=''>--select-goal--</option>
                        {habbitContent?.options?.goal_options?.map((element) => (
                            // doc says "goal_name" not "name"
                            <option key={element?.id} value={element?.id}>
                                {element?.goal_name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ── Frequency Unit (radio) ── */}
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
                                    checked={inputData.frequency_unit === element}
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
                        value={inputData.frequency_interval}
                        onChange={handleChange}
                    />
                </div>

                {/* ── Days of Week (only when weekly) ── */}
                {isWeekly && (
                    <div className='values_form_input_Wrapper' style={{ marginTop: '0px' }}>
                        <label style={{ margin: '20px 15px 10px 15px' }}>
                            Days of Week <span>*</span>
                        </label>
                        <ul className='values_checkbox_button' style={{ flexDirection: 'row', gap: '20px', margin: '0 0' }}>
                            {habbitContent?.options?.weekdays?.map((element) => (
                                <li key={element} className='values_checkbox_wrapper'>
                                    <input
                                        name='days_of_week'
                                        value={element}
                                        type='checkbox'
                                        checked={inputData.days_of_week.includes(element)}
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
                                        checked={inputData.monthly_mode === element}
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

                {/* ── Day of Month (only when monthly + day_of_month mode) ── */}
                {isDayOfMonth && (
                    <div className='values_form_input_Wrapper'>
                        <Input
                            placeholder={'Enter day of month (1-31)'}
                            type={'number'}
                            label={'Day of Month'}
                            required={true}
                            name='day_of_month'
                            value={inputData.day_of_month}
                            onChange={handleChange}
                        />
                    </div>
                )}

                {/* ── Week of Month + Monthly Day of Week (only when monthly + weekday_of_month mode) ── */}
                {isWeekdayOfMonth && (
                    <>
                        <div className='values_form_input_Wrapper'>
                            <label>Week of Month <span>*</span></label>
                            <select
                                name='week_of_month'
                                value={inputData.week_of_month}
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
                                name='monthly_day_of_week'
                                value={inputData.monthly_day_of_week}
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

                {/* ── Bottom Grid: Dates, Target, Reminder ── */}
                <div className='values_form_grid_wrapper' style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr)' }}>

                    <div className='values_form_input_Wrapper'>
                        <Input
                            placeholder={'Enter start date'}
                            type={'date'}
                            label={'Start Date'}
                            required={true}
                            name='start_date'
                            value={inputData.start_date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='values_form_input_Wrapper'>
                        <Input
                            placeholder={'Enter end date (optional)'}
                            type={'date'}
                            label={'End Date'}
                            name='end_date'
                            value={inputData.end_date}
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
                            value={inputData.target_count}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='values_form_input_Wrapper'>
                        <label>Target Period <span>*</span></label>
                        <select
                            name='target_period'
                            value={inputData.target_period}
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
                            value={inputData.reminder_time}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='values_form_input_Wrapper'>
                        <Input
                            label={'Timezone'}
                            required={true}
                            placeholder={'e.g. Asia/Kolkata'}
                            name='timezone'
                            value={inputData.timezone}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </form>
        </>
    )
}

export default HabitTracker