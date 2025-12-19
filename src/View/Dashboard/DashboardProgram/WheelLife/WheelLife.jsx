import React, { useState } from 'react'
import LifeElements from './LifeElements'
import Frogivness from './Frogivness'

const WheelLife = ({ completedFunction }) => {
    const [toggle, setToggle] = useState({
        life: true,
        frogivness: false,
    })
    const toggleFunction = (id) => {
        setToggle({
            life: id === 1 ? true : false,
            frogivness: id === 2 ? true : false
        })
    }
    return (
        <>
            {toggle.life && <LifeElements toggleFunction={toggleFunction} />}
            {toggle.frogivness && <Frogivness completedFunction={completedFunction}/>}
        </>
    )
}

export default WheelLife
