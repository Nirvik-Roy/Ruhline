import React, { useEffect, useState } from 'react'
import leftarrow from '../../../../assets/Images/Group 1000003044.svg'
import rightarrow from '../../../../assets/Images/Group 1000003045.svg'
import deleteIcon from '../../../../assets/Images/delete.svg'
import Button from '../../../../Components/Button/Button'
import Loaders from '../../../../Components/Loaders/Loaders'
import { saveCardSelection } from '../../../../utils/program'
import { useParams } from 'react-router-dom'
import PrevSubmit from '../../../../Components/PrevSubmit/PrevSubmit.jsx'
import toast from 'react-hot-toast'
const RemoveCardGame = ({ cardGamestate, setCardGamestate }) => {
  const [selectedCards, setselectedCards] = useState([])
  const [availableCards, setavailableCards] = useState([]);
  const [loading, setloading] = useState(false);
  const { enrollmentId } = useParams()
  const cardFunction = (index) => {
    const selectedItem = availableCards[index]
    if (selectedCards?.length != 10) {
      setselectedCards(prev => [...prev, selectedItem])
      setavailableCards(prev => prev.filter((_, i) => i !== index))
    } else {
      toast.error('You cannot select more than 10 cards')
    }
  }

  const removeCard = (index) => {
    const selectedItem = selectedCards[index]
    const dummyData = [...selectedCards]
    const filteredData = dummyData.filter((e, i) => i !== index)
    setselectedCards([...filteredData])
    setavailableCards([...availableCards, selectedItem])
  }
  useEffect(() => {
    const cardsAvailable = cardGamestate?.card_snapshots?.filter((element) =>
      cardGamestate?.remaining_card_snapshot_ids?.includes(element?.id)
    )
    setavailableCards(cardsAvailable || [])
  }, [cardGamestate])


  const saveCards = async () => {
    if (selectedCards?.length == 10) {
      setloading(true)
      const formData = new FormData()
      selectedCards?.forEach((e) => {
        formData?.append(`card_snapshot_ids[]`, e?.id)
      })
      const res = await saveCardSelection(enrollmentId, cardGamestate?.program_structure_id, formData, cardGamestate?.navigation?.current_question_set_id)
      setCardGamestate(res?.data)
      setloading(false)
    } else {
      toast.error('Plz select 10 cards')
      setloading(false)
    }
  }

  return (
    <>

      {loading && <Loaders />}
      <PrevSubmit title={'Card Game:'} objective={'Choose 10 cards to remove'} onSumbit={(() => {
        saveCards()
      })} />
      <div className='card_game_cards_Main_wrapper'>
        <div className='card_game_arrows_wrapper'>
          <img src={leftarrow} />
          <img src={rightarrow} />
        </div>
        <div className='card_game_gird_wrapper'>
          {availableCards?.map((e, index) => (
            <div onClick={(() => cardFunction(index))} className='card_game_card'>
              <h1>{e.id}</h1>
              <h6>{e.name}</h6>
              <p>{e.description}</p>
            </div>
          ))}

        </div>

        <h3>Selected Cards</h3>

        <div className='card_game_gird_wrapper'>
          {selectedCards?.length <= 0 && <p style={{
            gridColumn: '1/-1',
            textAlign: 'center',
            color: 'var(--primary-color)'
          }}>No cards are selected...</p>}
          {selectedCards?.map((e, i) => (
            <div className='card_game_card'>
              <img src={deleteIcon} onClick={(() => removeCard(i))} />
              <h1>{e.id}</h1>
              <h6>{e.name}</h6>
              <p>{e.description}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}

export default RemoveCardGame
