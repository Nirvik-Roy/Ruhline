import React from 'react'
import { Rating } from 'react-simple-star-rating'
import Button from '../../../../Components/Button/Button'
const LifeElements = ({toggleFunction}) => {
    return (
        <>
            <div className='values_head'>
                <h4><span>Wheel of Life:</span> Life Elements </h4>
            </div>

            <div className='wheel_life_grid_wrapper'>
                {['Anxiety', 'Depression', 'Peace', 'Courage', 'Forgiveness', 'Health'].map((e, i) => (
                    <div className='wheel_life_card'>
                        <h4>{e}</h4>

                        <div className='rate_life_elements_wrapper'>
                            <p>Rate Life Elements:</p>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                overflowX:'auto',
                                overflowY:'hidden'
                            }}>
                                <Rating
                                 
                                    className='ratings'
                                    size={25}
                                    fillColor="gold"

                                />
                                <Rating
                                  
                                    className='ratings'
                                      size={25}
                                    fillColor="gold"
                                />
                            </div>
                        </div>
                    </div>
                ))}


            </div>


            <div onClick={(() => toggleFunction(2))} style={{
                marginTop: '30px'
            }}>
                <Button children={'Next'} />
            </div>
        </>
    )
}

export default LifeElements
