import React, { useEffect, useState } from 'react'
import Button from '../../../../Components/Button/Button'
import toast from 'react-hot-toast'
import { saveCardSelection } from '../../../../utils/program';
import { useParams } from 'react-router-dom';
import Loaders from '../../../../Components/Loaders/Loaders';
import PrevSubmit from '../../../../Components/PrevSubmit/PrevSubmit';
const SixCards = ({ cardGamestate, setCardGamestate }) => {
    const [availableCards, setavailableCards] = useState([]);
    const [cardSelect, setcardSelect] = useState([]);
    const { enrollmentId } = useParams()
    const [loading, setloading] = useState(false)
    const cardFunction = (id) => {
        if (cardSelect.includes(id)) {
            setcardSelect(prev => prev.filter(e => e !== id));
        } else if (!cardSelect.includes(id) && cardSelect?.length < 6) {
            setcardSelect([...cardSelect, id])
        } else {
            toast.error('You cannot select more than 6 cards')
        }
    }

    useEffect(() => {
        const cardsAvailable = cardGamestate?.card_snapshots?.filter((element) =>
            cardGamestate?.remaining_card_snapshot_ids?.includes(element?.id)
        )
        setavailableCards(cardsAvailable || [])
    }, [cardGamestate])


    const saveCards = async () => {
        if (cardSelect?.length == 6) {
            setloading(true)
            const formData = new FormData()
            cardSelect?.forEach((e) => {
                formData?.append(`card_snapshot_ids[]`, e)
            })
            const res = await saveCardSelection(enrollmentId, cardGamestate?.program_structure_id, formData, cardGamestate?.navigation?.current_question_set_id)
            setCardGamestate(res?.data)
            setloading(false)
        } else {
            toast.error('Plz select 6 cards')
            setloading(false)
        }
    }
    return (
        <>
            {loading && <Loaders />}
            <PrevSubmit title={'Card Game:'} objective={'Select 6 cards to keep'} onSumbit={(() => {
                saveCards()
            })} />
            <div className='card_game_gird_wrapper'>
                {availableCards?.map((e) => (
                    <div onClick={(() => cardFunction(e.id))} style={cardSelect.includes(e.id) ? {
                        border: '1px solid rgba(36, 159, 50, 1)',
                        background: 'rgba(36, 159, 50, 0.07)'
                    } : {}} className='card_game_card'>
                        <h1>{e.id}</h1>
                        <h6>{e.name}</h6>
                        <p>{e.description}</p>
                    </div>
                ))}

            </div>

        </>
    )
}

export default SixCards
