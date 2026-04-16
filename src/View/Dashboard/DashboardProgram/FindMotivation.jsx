import React, { useEffect, useRef, useState } from 'react'
import check from '../../../assets/Images/Layer_1 (5).svg'
import Button from '../../../Components/Button/Button'
import PrevSubmit from '../../../Components/PrevSubmit/PrevSubmit'
import { saveMotivationWords } from '../../../utils/program'
import { useParams } from 'react-router-dom'
import Loaders from '../../../Components/Loaders/Loaders'
import toast from 'react-hot-toast'
const FindMotivation = ({ completedFunction, motivationContent, fetchMotivation }) => {
    const [wordIndex, setwordIndex] = useState(0);
    const [inputs, setInputs] = useState([]);
    const inputRefs = useRef([]);
    const { enrollmentId } = useParams()
    const [loading, setloading] = useState(false)
    useEffect(() => {
        const wordData = motivationContent?.words?.[wordIndex];

        if (!wordData) return;

        const guessWord = wordData?.guess?.guess_word;

        // ✅ Scenario 1: If guess exists → use it
        if (guessWord) {
            const updatedArray = guessWord.slice(1).split("");
            setInputs(updatedArray);
        }
        // ✅ Scenario 2: No guess → create empty inputs
        else {
            const length = wordData?.word_length - 1 || 0;
            setInputs(Array.from({ length }, () => ""));
        }

    }, [wordIndex, motivationContent]);


    const handleChange = (value, index) => {
        const updated = [...inputs];   // copy array
        updated[index] = value;       // update specific index
        setInputs(updated);

        if (value && index < inputs.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }// update state
    };

    const postMotivation = async () => {
        setloading(true)
        if (!inputs.includes('')) {
            const formData = new FormData()
            formData.append('guess_word', motivationContent?.words[wordIndex]?.first_letter + inputs.join(''))
            const res = await saveMotivationWords(enrollmentId, motivationContent?.program_structure_id, motivationContent?.words[wordIndex]?.id, formData)
            if (res?.success) {
                if (wordIndex < motivationContent?.words?.length - 1) {
                    setwordIndex(wordIndex + 1)
                }
                fetchMotivation(motivationContent?.program_structure_id)
            }
        } else {
            toast.error('Plz fill all the boxes..')
        }

        setloading(false)
    }
    return (
        <>
            {loading && <Loaders />}
            <PrevSubmit objective={`Guess word ${wordIndex + 1} of ${motivationContent?.words?.length}`} title={'Find your Motivation'} firstStep={wordIndex == 0} lastStep={motivationContent?.length == wordIndex} onSumbit={(() => {
                if (wordIndex < motivationContent?.words?.length) {
                    postMotivation()
                }
            })} onPrevious={(() => {
                if (wordIndex != 0) {
                    setwordIndex(wordIndex - 1)
                }
            })} previousButton={true} />
            <div className='motivation_wrapper'>
                {motivationContent?.words?.map((e, i) => {
                    if (i == wordIndex) {
                        return (
                            <>
                                <div className='motivation_input_wrapper'>
                                    <h1>{e?.first_letter}</h1>
                                    {
                                        inputs.map((val, index) => (
                                            <input
                                                key={index}
                                                value={val}
                                                ref={(el) => (inputRefs.current[index] = el)}

                                                onChange={(e) => handleChange(e.target.value, index)}
                                                maxLength={1}
                                                type="text"
                                            />
                                        ))
                                    }
                                </div>
                            </>
                        )
                    }
                })}
            </div>
            <div onClick={(() => completedFunction(5))} style={{
                marginTop: '30px',
            }}>
                {/* <Button children={'Submit'} /> */}
            </div>
        </>
    )
}

export default FindMotivation
