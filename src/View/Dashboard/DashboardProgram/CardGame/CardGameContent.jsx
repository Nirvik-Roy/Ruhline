import React, { useState } from 'react'
import Textarea from '../../../../Components/Inputs/Textarea'
import Button from '../../../../Components/Button/Button'
import CardGameForm from './CardGameForm'
import RemoveCardGame from './RemoveCardGame'
import SixCards from './SixCards'
import CoreValues from './CoreValues'
const CardGameContent = ({ completedFunction, cardGamestate, setCardGamestate }) => {
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
