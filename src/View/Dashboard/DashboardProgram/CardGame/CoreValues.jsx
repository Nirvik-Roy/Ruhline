import React from 'react'
import Button from '../../../../Components/Button/Button'
const CoreValues = ({completedFunction}) => {
    const cardData = [
        {
            id: 1,
            title: 'Anxiety',
            para: "Stability, orderliness, predictability",
        },
        {
            id: 2,
            title: 'Depression',
            para: "Stability, orderliness, predictability",
        },
        {
            id: 3,
            title: 'Forgiveness',
            para: "Stability, orderliness, predictability",
        },
        {
            id: 4,
            title: 'Loyalty',
            para: "Stability, orderliness, predictability",
        },
        {
            id: 5,
            title: 'Peace',
            para: "Stability, orderliness, predictability",
        },
        {
            id: 6,
            title: 'Health',
            para: "Stability, orderliness, predictability",
        },
    ]
    return (
        <>
            <div className='values_head'>
                <h4><span>Card Game:</span> Your core values are</h4>
            </div>

            <div className='card_game_gird_wrapper'>
                {cardData.map((e, i) => (
                    <div className='card_game_card'>
                        <h1>{e.id}</h1>
                        <h6>{e.title}</h6>
                        <p>{e.para}</p>
                    </div>
                ))}

            </div>
            <div style={{
                marginTop: '30px',
            }}>
                <div onClick={(()=>completedFunction(2))}>
                    <Button children={'Finish'} />
                </div>
            </div>
        </>
    )
}

export default CoreValues
