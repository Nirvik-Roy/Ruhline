import React, { useState } from 'react'
import Textarea from '../../../../Components/Inputs/Textarea'
import Button from '../../../../Components/Button/Button'
import CardGameForm from './CardGameForm'
import RemoveCardGame from './RemoveCardGame'
import SixCards from './SixCards'
import CoreValues from './CoreValues'
const CardGameContent = ({completedFunction}) => {
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
            {toggle.cardForm && <CardGameForm toggleFunction={toggleFunction} />}
            {toggle.removeCard && <RemoveCardGame toggleFunction={toggleFunction} />}
            {toggle.sixCards && <SixCards toggleFunction={toggleFunction} />}
            {toggle.coreValues && <CoreValues toggleFunction={toggleFunction} completedFunction={completedFunction} />}
        </>
    )
}

export default CardGameContent
