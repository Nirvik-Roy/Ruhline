import React, { useEffect, useState } from 'react'
import Button from '../../../../Components/Button/Button'
import Textarea from '../../../../Components/Inputs/Textarea'
import Input from '../../../../Components/Inputs/Input'
import PrevSubmit from '../../../../Components/PrevSubmit/PrevSubmit'
import { useParams } from 'react-router-dom'
import { saveWheelOfLifequestion } from '../../../../utils/program'
import toast from 'react-hot-toast'
import Loaders from '../../../../Components/Loaders/Loaders'
const ElementsQuestion = ({ questionsData, fetchLifeElementsQuestion, markWheelOfLifeCompleted }) => {
    const [questionIndex, setquestionIndex] = useState(0);
    const [descriptiveAnswer, setdescriptiveAnswer] = useState("")
    const [multiChoiceAnswer, setmultichoiceAnswer] = useState([])
    const [singleChoiceAnswer, setsingleChoiceAnswer] = useState("")
    const [dropdownAnswer, setdropdownAnswer] = useState("");
    const [loading, setloading] = useState(false);
    const [postLoading,setpostLoading] = useState(false)
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

    const resetAnswers = () => {
        setdescriptiveAnswer('')
        setmultichoiceAnswer([])
        setdropdownAnswer('')
        setsingleChoiceAnswer('')
    }

    const handleSaveSuccess = (res) => {
        const isLastQuestion = questionIndex === questionsData?.questions?.length - 1;

        if (!isLastQuestion) {
            setquestionIndex(questionIndex + 1);
            resetAnswers();
            fetchLifeElementsQuestion(questionsData?.element?.id);
            return;
        }

        if (res?.data?.navigation?.has_next_element) {
            fetchLifeElementsQuestion(res?.data?.navigation?.next_element_id);
            setquestionIndex(0);
            resetAnswers();
            return;
        }

        // Last question of last element — hide questions immediately (like Values)
        markWheelOfLifeCompleted?.();
    }


    useEffect(() => {
        if (questionsData?.questions?.[questionIndex]?.type == 'descriptive') {
            setdescriptiveAnswer(questionsData?.questions?.[questionIndex]?.answer?.answer_text || '')
        }

        if (questionsData?.questions?.[questionIndex]?.type == 'multi_choice') {
            setmultichoiceAnswer(questionsData?.questions?.[questionIndex]?.answer?.answer_options || [])
        }


        if (questionsData?.questions?.[questionIndex]?.type == 'single_choice') {
            setsingleChoiceAnswer(questionsData?.questions?.[questionIndex]?.answer?.answer_option || '')
        }

        if (questionsData?.questions?.[questionIndex]?.type == 'dropdown') {
            setdropdownAnswer(questionsData?.questions?.[questionIndex]?.answer?.answer_option || '')
        }
    }, [questionIndex, questionsData])
    const saveQuestions = async () => {
        setpostLoading(true)
        if (questionsData?.questions?.[questionIndex].type == 'descriptive') {
            if (descriptiveAnswer != '') {
                const formData = new FormData()
                formData.append('answer_text', descriptiveAnswer)
                const res = await saveWheelOfLifequestion(enrollmentId, questionsData?.program_structure_id, questionsData?.questions?.[questionIndex].id, formData, questionsData?.element?.id)
                if (res?.success) {
                    handleSaveSuccess(res)
                }
            } else {
                toast.error('Please answer the question...')
            }
        }

        if (questionsData?.questions[questionIndex].type == 'multi_choice') {
            if (multiChoiceAnswer.length > 0) {
                const formData = new FormData()
                multiChoiceAnswer?.forEach((element) => (
                    formData.append("answer_options[]", element)
                ))
                const res = await saveWheelOfLifequestion(enrollmentId, questionsData?.program_structure_id, questionsData?.questions[questionIndex].id, formData, questionsData?.element?.id);
                if (res?.success) {
                    handleSaveSuccess(res)
                }
            } else {
                toast.error('Please select atleast one option..')
            }
        }

        if (questionsData?.questions[questionIndex].type == 'single_choice') {
            if (singleChoiceAnswer != "") {
                const formData = new FormData()
                formData.append('answer_option', singleChoiceAnswer)
                const res = await saveWheelOfLifequestion(enrollmentId, questionsData?.program_structure_id, questionsData?.questions[questionIndex].id, formData, questionsData?.element?.id);
                if (res?.success) {
                    handleSaveSuccess(res)
                }
            } else {
                toast.error('Please select atleast one option..')
            }
        }


        if (questionsData?.questions[questionIndex].type == 'dropdown') {
            if (dropdownAnswer != "") {
                const formData = new FormData()
                formData.append('answer_option', dropdownAnswer)
                const res = await saveWheelOfLifequestion(enrollmentId, questionsData?.program_structure_id, questionsData?.questions[questionIndex].id, formData, questionsData?.element?.id);
                if (res?.success) {
                    handleSaveSuccess(res)
                }
            } else {
                toast.error('Please select atleast one option..')
            }
        }
        setpostLoading(false)
    }

    return (
        <>
            {loading && <Loaders />}
            <PrevSubmit loading={postLoading} loadingText={'Saving...'} firstStep={questionIndex == 0} onPrevious={(() => {
                if (questionIndex != 0) {
                    setquestionIndex(questionIndex - 1)

                }
            })} title={`Wheel of life (${questionsData?.element?.name}):`} lastStep={questionIndex == questionsData?.questions?.length - 1} onSumbit={(() => {
                if (questionIndex < questionsData?.questions?.length) {
                    saveQuestions()
                }
            })} objective={`Question ${questionIndex + 1} of ${questionsData?.questions?.length || 0}`} />
            <form className='values_form_wrapper'>
                <h5>Answer the Question </h5>
                {questionsData?.questions?.length <= 0 && !loading && <p style={{
                    textAlign: 'center',
                    gridColumn: '1/-1',
                    color: 'var(--primary-color)'
                }}>No questions available...</p>}
                {questionsData?.questions?.map((element, i) => {
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

export default ElementsQuestion
