import React, { useEffect, useState } from 'react'
import Button from '../../../../Components/Button/Button'
import PrevSubmit from '../../../../Components/PrevSubmit/PrevSubmit';
import { finalSubmitCard } from '../../../../utils/program';
import { useParams } from 'react-router-dom';
import Loaders from '../../../../Components/Loaders/Loaders';
const CoreValues = ({ cardGamestate, setCardGamestate }) => {
    const [availableCards, setavailableCards] = useState([]);
    const [loading, setloading] = useState(false)
    const { enrollmentId } = useParams()
    useEffect(() => {
        const mappedData = cardGamestate?.core_values?.map((element, index) => (
            {
                index: index + 1,
                id: element?.id,
                name: element?.name,
                description: element?.description
            }
        )) || []
        setavailableCards(mappedData || [])
    }, [cardGamestate])

    return (
        <>
            <PrevSubmit loading={loading} loadingText={'Saving...'} title={'Card Game:'} onSumbit={(async () => {
                setloading(true)
                const res = await finalSubmitCard(enrollmentId, cardGamestate?.program_structure_id)
                if (res?.success) {
                    setCardGamestate(res?.data)
                }
                setloading(false)
            })} lastStep={true} objective={'Your core values are'} />

            <div className='card_game_gird_wrapper'>
                {availableCards?.map((e) => (
                    <div className='card_game_card'>
                        <h1>{e.index}</h1>
                        <h6>{e.name}</h6>
                        <p>{e.description}</p>
                    </div>
                ))}

            </div>
        </>
    )
}

export default CoreValues
