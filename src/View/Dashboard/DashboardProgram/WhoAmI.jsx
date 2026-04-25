import Input from '../../../Components/Inputs/Input'
import Textarea from '../../../Components/Inputs/Textarea'
import Button from '../../../Components/Button/Button'
import PrevSubmit from '../../../Components/PrevSubmit/PrevSubmit'
import { useEffect, useState } from 'react'
import { saveWhoamIQuestion } from '../../../utils/program'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loaders from '../../../Components/Loaders/Loaders'

const WhoAmiI = ({ completedFunction, whoAmIContent, fetchWhoamIQuestion }) => {
    const { enrollmentId } = useParams()
    const questions = whoAmIContent?.questions || [];
    const [questionIndex, setquestionIndex] = useState(0);
    const [descriptiveAnswer, setdescriptiveAnswer] = useState("")
    const [multiChoiceAnswer, setmultichoiceAnswer] = useState([])
    const [singleChoiceAnswer, setsingleChoiceAnswer] = useState("")
    const [dropdownAnswer, setdropdownAnswer] = useState("");
    const [loading, setloading] = useState(false)

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
        if (questions[questionIndex]?.type == 'descriptive') {
            setdescriptiveAnswer(questions[questionIndex]?.answer?.answer_text || '')
        }

        if (questions[questionIndex]?.type == 'multi_choice') {
            setmultichoiceAnswer(questions[questionIndex]?.answer?.answer_options || [])
        }


        if (questions[questionIndex]?.type == 'single_choice') {
            setsingleChoiceAnswer(questions[questionIndex]?.answer?.answer_option || '')
        }

        if (questions[questionIndex]?.type == 'dropdown') {
            setdropdownAnswer(questions[questionIndex]?.answer?.answer_option || '')
        }
    }, [questionIndex, questions])


    const saveQuestions = async () => {
        setloading(true)
        if (questions[questionIndex].type == 'descriptive') {
            if (descriptiveAnswer != '') {
                const formData = new FormData()
                formData.append('answer_text', descriptiveAnswer)
                const res = await saveWhoamIQuestion(enrollmentId, whoAmIContent?.program_structure_id, questions[questionIndex].id, formData)
                if (res?.success) {
                    if (questionIndex < questions?.length - 1) {
                        setquestionIndex(questionIndex + 1);
                        setdescriptiveAnswer('')
                        setmultichoiceAnswer([])
                        setdropdownAnswer('')
                        setsingleChoiceAnswer('')
                    }
                    fetchWhoamIQuestion(whoAmIContent?.program_structure_id)
                }
            } else {
                toast.error('Plz answer the question...')
            }
        }

        if (questions[questionIndex].type == 'multi_choice') {
            if (multiChoiceAnswer.length > 0) {
                const formData = new FormData()
                multiChoiceAnswer?.forEach((element) => (
                    formData.append("answer_options[]", element)
                ))
                const res = await saveWhoamIQuestion(enrollmentId, whoAmIContent?.program_structure_id, questions[questionIndex].id, formData);
                if (res?.success) {
                    if (questionIndex < questions?.length - 1) {
                        setquestionIndex(questionIndex + 1);
                        setdescriptiveAnswer('')
                        setmultichoiceAnswer([])
                        setdropdownAnswer('')
                        setsingleChoiceAnswer('')
                    }
                    fetchWhoamIQuestion(whoAmIContent?.program_structure_id)
                }
            } else {
                toast.error('Plz select atleast one option..')
            }
        }

        if (questions[questionIndex].type == 'single_choice') {
            if (singleChoiceAnswer != "") {
                const formData = new FormData()
                formData.append('answer_option', singleChoiceAnswer)
                const res = await saveWhoamIQuestion(enrollmentId, whoAmIContent?.program_structure_id, questions[questionIndex].id, formData);
                if (res?.success) {
                    if (questionIndex < questions?.length - 1) {
                        setquestionIndex(questionIndex + 1);
                        setdescriptiveAnswer('')
                        setmultichoiceAnswer([])
                        setdropdownAnswer('')
                        setsingleChoiceAnswer('')
                    }
                    fetchWhoamIQuestion(whoAmIContent?.program_structure_id)
                }
            } else {
                toast.error('Plz select atleast one option..')
            }
        }


        if (questions[questionIndex].type == 'dropdown') {
            if (dropdownAnswer != "") {
                const formData = new FormData()
                formData.append('answer_option', dropdownAnswer)
                const res = await saveWhoamIQuestion(enrollmentId, whoAmIContent?.program_structure_id, questions[questionIndex].id, formData);
                if (res?.success) {
                    if (questionIndex < questions?.length - 1) {
                        setquestionIndex(questionIndex + 1);
                        setdescriptiveAnswer('')
                        setmultichoiceAnswer([])
                        setdropdownAnswer('')
                        setsingleChoiceAnswer('')
                    }
                    fetchWhoamIQuestion(whoAmIContent?.program_structure_id)
                }
            } else {
                toast.error('Plz select atleast one option..')
            }
        }
        setloading(false)
    }

   
    return (
        <>
            {loading && <Loaders />}
            <PrevSubmit loading={loading} loadingText={'Saving...'} firstStep={questionIndex == 0} onPrevious={(() => {
                if (questionIndex != 0) {
                    setquestionIndex(questionIndex - 1)

                }
            })} title={'Who Am I'} lastStep={questionIndex == questions?.length - 1} onSumbit={(() => {
                if (questionIndex < questions?.length) {
                    saveQuestions()
                }
            })} objective={`Question ${questionIndex + 1} of ${questions?.length}`} />

            <form className='values_form_wrapper'>
                <h5>Answer the Question </h5>
                {questions?.length <=0 && !loading && <p style={{
                    textAlign:'center',
                    gridColumn:'1/-1',
                    color:'var(--primary-color)'
                }}>No questions available...</p>}
                {questions?.map((element, i) => {
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

export default WhoAmiI
