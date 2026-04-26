import React, { useEffect, useState } from 'react'
import Textarea from '../../../../Components/Inputs/Textarea.jsx'
import Button from '../../../../Components/Button/Button'
import { useParams } from 'react-router-dom'
import PrevSubmit from '../../../../Components/PrevSubmit/PrevSubmit.jsx'
import Loaders from '../../../../Components/Loaders/Loaders.jsx'
import toast from 'react-hot-toast'
import { saveCardGameQuestions } from '../../../../utils/program.js'
const CardGameForm = ({ cardGamestate, setCardGamestate }) => {
    const [questionIndex, setquestionIndex] = useState(0)
    const [questionSet, setquestionSet] = useState({})
    const [descriptiveAnswer, setdescriptiveAnswer] = useState("")
    const [multiChoiceAnswer, setmultichoiceAnswer] = useState([])
    const [singleChoiceAnswer, setsingleChoiceAnswer] = useState("")
    const [dropdownAnswer, setdropdownAnswer] = useState("");
    const [loading, setloading] = useState(false)
    const { enrollmentId } = useParams()
    const handleMultichoice = (value) => {
        if (multiChoiceAnswer.includes(value)) {
            setmultichoiceAnswer((prev) => {
                return prev.filter((e) => e != value)
            })
        } else {
            setmultichoiceAnswer([...multiChoiceAnswer, value])
        }
    }






    useEffect(() => {
        if (questionSet?.questions?.[questionIndex]?.type == 'descriptive') {
            setdescriptiveAnswer(questionSet?.questions?.[questionIndex]?.answer?.answer_text || '')
        }

        if (questionSet?.questions?.[questionIndex]?.type == 'multi_choice') {
            setmultichoiceAnswer(questionSet?.questions?.[questionIndex]?.answer?.answer_options || [])
        }


        if (questionSet?.questions?.[questionIndex]?.type == 'single_choice') {
            setsingleChoiceAnswer(questionSet?.questions?.[questionIndex]?.answer?.answer_option || '')
        }

        if (questionSet?.questions?.[questionIndex]?.type == 'dropdown') {
            setdropdownAnswer(questionSet?.questions?.[questionIndex]?.answer?.answer_option || '')
        }
    }, [questionIndex, questionSet])


    useEffect(() => {
        setquestionSet(cardGamestate?.question_sets?.[cardGamestate?.navigation?.current_question_set_index])
    }, [cardGamestate])


    const saveQuestions = async () => {
        setloading(true)
        if (questionSet?.questions?.[questionIndex].type == 'descriptive') {
            if (descriptiveAnswer != '') {
                const formData = new FormData()
                formData.append('answer_text', descriptiveAnswer)
                const res = await saveCardGameQuestions(enrollmentId, cardGamestate?.program_structure_id, questionSet?.questions?.[questionIndex].id, formData, questionSet?.id)
                if (res?.success) {
                    if (questionIndex < questionSet?.questions?.length - 1) {
                        setquestionIndex(questionIndex + 1);
                        setdescriptiveAnswer('')
                        setmultichoiceAnswer([])
                        setdropdownAnswer('')
                        setsingleChoiceAnswer('')
                        setCardGamestate(res?.data)
                    }
                    setCardGamestate(res?.data)
                    setloading(false)
                }else{
                    setloading(false)
                }
            } else {
                toast.error('Plz answer the question...')
            }
        }

        if (questionSet?.questions[questionIndex].type == 'multi_choice') {
            if (multiChoiceAnswer.length > 0) {
                const formData = new FormData()
                multiChoiceAnswer?.forEach((element) => (
                    formData.append("answer_options[]", element)
                ))
                const res = await saveCardGameQuestions(enrollmentId, cardGamestate?.program_structure_id, questionSet?.questions?.[questionIndex].id, formData, questionSet?.id)
                if (res?.success) {
                    if (questionIndex < questionSet?.questions?.length - 1) {
                        setquestionIndex(questionIndex + 1);
                        setdescriptiveAnswer('')
                        setmultichoiceAnswer([])
                        setdropdownAnswer('')
                        setsingleChoiceAnswer('')
                        setCardGamestate(res?.data)

                    }
                    setCardGamestate(res?.data)

                    setloading(false)
                } else {
                    setloading(false)
                }
            } else {
                toast.error('Plz select atleast one option..')
            }
        }

        if (questionSet?.questions[questionIndex].type == 'single_choice') {
            if (singleChoiceAnswer != "") {
                const formData = new FormData()
                formData.append('answer_option', singleChoiceAnswer)
                const res = await saveCardGameQuestions(enrollmentId, cardGamestate?.program_structure_id, questionSet?.questions?.[questionIndex].id, formData, questionSet?.id)
                if (res?.success) {
                    if (questionIndex < questionSet?.questions?.length - 1) {
                        setquestionIndex(questionIndex + 1);
                        setdescriptiveAnswer('')
                        setmultichoiceAnswer([])
                        setdropdownAnswer('')
                        setsingleChoiceAnswer('')
                        setCardGamestate(res?.data)
                        
                    }
                    setCardGamestate(res?.data)

                    setloading(false)
                } else {
                    setloading(false)
                }
            } else {
                toast.error('Plz select atleast one option..')
            }
        }


        if (questionSet?.questions[questionIndex].type == 'dropdown') {
            if (dropdownAnswer != "") {
                const formData = new FormData()
                formData.append('answer_option', dropdownAnswer)
                const res = await saveCardGameQuestions(enrollmentId, cardGamestate?.program_structure_id, questionSet?.questions?.[questionIndex].id, formData, questionSet?.id);
                if (res?.success) {
                    if (questionIndex < questionSet?.questions?.length - 1) {
                        setquestionIndex(questionIndex + 1);
                        setdescriptiveAnswer('')
                        setmultichoiceAnswer([])
                        setdropdownAnswer('')
                        setsingleChoiceAnswer('')
                        setCardGamestate(res?.data)

                    }
                    setCardGamestate(res?.data)

                    setloading(false)
                } else {
                    setloading(false)
                }
            } else {
                toast.error('Plz select atleast one option..')
                
            }
        }
        setloading(false)
    }

    return (
        <>
            <PrevSubmit loading={loading} loadingText={'Saving...'} firstStep={questionIndex == 0} onPrevious={(() => {
                if (questionIndex != 0) {
                    setquestionIndex(questionIndex - 1)

                }
            })} title={`${questionSet?.title}-`} lastStep={questionIndex == questionSet?.questions?.length - 1} onSumbit={(() => {
                if (questionIndex < questionSet?.questions?.length) {
                    saveQuestions()
                }
            })} objective={`Question ${questionIndex + 1} of ${questionSet?.questions?.length || 0}`} />

            <form className='values_form_wrapper'>
                <h5>Answer the Question </h5>
                {questionSet?.questions?.length <= 0 && !loading && <p style={{
                    textAlign: 'center',
                    gridColumn: '1/-1',
                    color: 'var(--primary-color)'
                }}>No questions available...</p>}
                {questionSet?.questions?.map((element, i) => {
                    if (i == questionIndex) {
                        if (element.type == 'descriptive') {
                            return (<>
                                <div className='values_form_input_Wrapper'>
                                    <Textarea onChange={((e) => setdescriptiveAnswer(e.target.value))} value={descriptiveAnswer} label={`${element?.question_number}. ${element?.question_text}`} required={true} placeholder={"Enter your answer.."} />
                                </div>
                            </>)
                        } else if (element.type == 'multi_choice') {
                            return (
                                <>
                                    <div className='values_form_input_Wrapper'>
                                        <label>{element?.question_number}. {element?.question_text}<span>*</span></label>
                                        <ul className='values_checkbox_button'>
                                            {element?.options?.map((e) => (
                                                <li className='values_checkbox_wrapper'>
                                                    <input checked={multiChoiceAnswer.includes(e)} value={e} onChange={((e) => handleMultichoice(e.target.value))} type='checkbox' />
                                                    <p>{e}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            )
                        } else if (element.type == 'single_choice') {
                            return (
                                <>
                                    <div className='values_form_input_Wrapper'>
                                        <label>{element?.question_number}. {element?.question_text}<span>*</span></label>
                                        <ul className='values_checkbox_button'>
                                            {element?.options?.map((e) => (
                                                <li className='values_checkbox_wrapper'>
                                                    <input checked={singleChoiceAnswer.includes(e)} value={e} onChange={((e) => setsingleChoiceAnswer(e.target.value))} type='radio' />
                                                    <p>{e}</p>
                                                </li>
                                            ))}

                                        </ul>
                                    </div>
                                </>
                            )
                        } else if (element.type == 'dropdown') {
                            return (
                                <>
                                    <div className='values_form_input_Wrapper' style={{
                                        marginTop: '20px'
                                    }}>
                                        <label>{element?.question_number}. {element?.question_text}<span>*</span></label>
                                        <select value={dropdownAnswer} onChange={((e) => setdropdownAnswer(e.target.value))} style={{
                                            height: '45px',
                                            background: 'transparent',
                                            borderRadius: '10px'
                                        }}>
                                            <option value={''}>--selection-one-option-</option>
                                            {element?.options?.map((e) => (
                                                <option value={e}>{e}</option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )
                        }
                    }
                })}
            </form>
        </>
    )
}

export default CardGameForm
