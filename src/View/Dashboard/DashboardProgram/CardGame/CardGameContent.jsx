import React, { useState } from 'react'
import Textarea from '../../../../Components/Inputs/Textarea'
import Button from '../../../../Components/Button/Button'
import CardGameForm from './CardGameForm'
import RemoveCardGame from './RemoveCardGame'
import SixCards from './SixCards'
import CoreValues from './CoreValues'
const CardGameContent = ({ completedFunction, cardGamestate, setCardGamestate }) => {
    const [toggle, settoggle] = useState({
        cardForm: true,
        removeCard: false,
        sixCards: false,
        coreValues: false,
    })
    const toggleFunction = (id) => {
        settoggle({
            cardForm: id === 1 ? true : false,
            removeCard: id === 2 ? true : false,
            sixCards: id === 3 ? true : false,
            coreValues: id === 4 ? true : false,
        })
    }
    return (
        <>
            {(cardGamestate?.navigation?.current_phase == 'questions') && <CardGameForm cardGamestate={cardGamestate} setCardGamestate={setCardGamestate}/> }
            {(cardGamestate?.navigation?.current_phase == 'remove_cards') && <RemoveCardGame cardGamestate={cardGamestate} setCardGamestate={setCardGamestate}/>}
            {(cardGamestate?.navigation?.current_phase == 'keep_cards') && <SixCards cardGamestate={cardGamestate} setCardGamestate={setCardGamestate} />}
            {(cardGamestate?.navigation?.current_phase == 'awaiting_submit') && <CoreValues setCardGamestate={setCardGamestate} cardGamestate={cardGamestate}  completedFunction={completedFunction} />}
        </>
    )
}

export default CardGameContent
