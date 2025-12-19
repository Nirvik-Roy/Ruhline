import React, { useState } from 'react'
import leftarrow from '../../../../assets/Images/Group 1000003044.svg'
import rightarrow from '../../../../assets/Images/Group 1000003045.svg'
import deleteIcon from '../../../../assets/Images/delete.svg'
import Button from '../../../../Components/Button/Button'
const RemoveCardGame = ({toggleFunction}) => {
  const [cardSelect, setcardSelect] = useState([])
  const cardFunction = (id) => {
    if (cardSelect.includes(id)) {
      setcardSelect(prev => prev.filter(e => e !== id));
    } else {
      setcardSelect([...cardSelect, id])
    }
  }
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
    {
      id: 7,
      title: 'Anxiety',
      para: "Stability, orderliness, predictability",
    },
    {
      id: 8,
      title: 'Depression',
      para: "Stability, orderliness, predictability",
    },
    {
      id: 9,
      title: 'Forgiveness',
      para: "Stability, orderliness, predictability",
    },
    {
      id: 10,
      title: 'Loyalty',
      para: "Stability, orderliness, predictability",
    },
    {
      id: 11,
      title: 'Peace',
      para: "Stability, orderliness, predictability",
    },
    {
      id: 12,
      title: 'Health',
      para: "Stability, orderliness, predictability",
    },
  ]
  return (
    <>
      <div className='values_head'>
        <h4><span>Card Game:</span> Select 10 cards to remove </h4>
      </div>
      <div className='card_game_cards_Main_wrapper'>
        <div className='card_game_arrows_wrapper'>
          <img src={leftarrow} />
          <img src={rightarrow} />
        </div>
        <div className='card_game_gird_wrapper'>
          {cardData.map((e, i) => (
            <div onClick={(() => cardFunction(e.id))} style={cardSelect.includes(e.id) ? {
              border: '1px solid rgba(36, 159, 50, 1)',
              background: 'rgba(36, 159, 50, 0.07)'
            } : {}} className='card_game_card'>
              <h1>{e.id}</h1>
              <h6>{e.title}</h6>
              <p>{e.para}</p>
            </div>
          ))}

        </div>

        <h3>Selected Cards</h3>



        <div className='card_game_gird_wrapper'>
          {cardData.map((e, i) => (
            <div className='card_game_card'>
              <img src={deleteIcon} />
              <h1>{e.id}</h1>
              <h6>{e.title}</h6>
              <p>{e.para}</p>
            </div>
          ))}

        </div>


        <div style={{
          marginTop: '30px',
          display:'flex',
          justifyContent:'flex-start',
          alignItems:'center',
          gap:'20px'
        }}>
          <button style={{
            color:'var(--text-color)',
            fontSize:'17px',
            fontWeight:'600',
            border:'none',
            background:'transparent'
          }}>Edit</button>
          <div onClick={(()=>toggleFunction(3))}>

          <Button children={'Next'} />
          </div>
        </div>

      </div>
    </>
  )
}

export default RemoveCardGame
