import React, { useEffect, useState } from 'react'
import Button from '../../../../Components/Button/Button'
import PrevSubmit from '../../../../Components/PrevSubmit/PrevSubmit';
import { finalSubmitCard } from '../../../../utils/program';
import { useParams } from 'react-router-dom';
const CoreValues = ({ completedFunction, cardGamestate, setCardGamestate }) => {
    const [availableCards, setavailableCards] = useState([]);
    const {enrollmentId} = useParams()
    useEffect(() => {
        setavailableCards(cardGamestate?.core_values || [])
    }, [cardGamestate])
    
    return (
        <>
            <PrevSubmit title={'Card Game:'} onSumbit={(async()=>{
                const res = await finalSubmitCard(enrollmentId, cardGamestate?.program_structure_id)
                if(res?.success){
                    setCardGamestate(res?.data)
                }
            })} lastStep={true} objective={'Your core values are'}/>

            <div className='card_game_gird_wrapper'>
                {availableCards?.map((e) => (
                    <div className='card_game_card'>
                        <h1>{e.id}</h1>
                        <h6>{e.name}</h6>
                        <p>{e.description}</p>
                    </div>
                ))}

            </div>
        </>
    )
}

export default CoreValues
