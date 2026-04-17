import React from 'react'
import { Rating } from 'react-simple-star-rating'
import Button from '../../../../Components/Button/Button'
import PrevSubmit from '../../../../Components/PrevSubmit/PrevSubmit'
const LifeElements = ({ lifeElements, handleRating, ratingData, postLifeElements }) => {

    return (
        <>
         <PrevSubmit title={'Wheel of life'} objective={'Rate life elements'} previousButton={false} onSumbit={postLifeElements}/>
            <div className='wheel_life_grid_wrapper'>
                {lifeElements?.elements?.map((e, index) => (
                    <div className='wheel_life_card'>
                        <h4>{e?.name}</h4>

                        <div className='rate_life_elements_wrapper'>
                            <p>Rate Life Elements:</p>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                overflowX: 'auto',
                                overflowY: 'hidden'
                            }}>
                                <Rating
                                    initialValue={ratingData[index]?.rating}
                                    onClick={((rate) => handleRating(index, rate))}
                                    className='ratings'
                                    size={25}
                                    fillColor="gold"
                                    iconsCount={10}
                                />

                            </div>
                        </div>
                    </div>
                ))}


            </div>
        </>
    )
}

export default LifeElements
