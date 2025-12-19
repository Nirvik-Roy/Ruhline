import React from 'react'
import check from '../../../assets/Images/Layer_1 (5).svg'
import Button from '../../../Components/Button/Button'
const FindMotivation = ({ completedFunction }) => {
    return (
        <>
            <div className='values_head'>
                <h4><span>Find your Motivation</span></h4>
            </div>
            <div className='motivation_wrapper'>
                <div className='motivation_input_wrapper'>
                    <h1>P</h1>
                    <input value={'E'} type='text' maxlength={1} />
                    <input value={'A'} type='text' maxlength={1} />
                    <input value={'C'} type='text' maxlength={1} />
                    <input value={'E'} type='text' maxlength={1} />
                    <img src={check} />
                </div>

                <div className='motivation_input_wrapper'>
                    <h1>H</h1>
                    <input type='text' maxlength={1} />
                    <input type='text' maxlength={1} />
                    <input type='text' maxlength={1} />
                    <input type='text' maxlength={1} />
                    <input type='text' maxlength={1} />
                    <input type='text' maxlength={1} />
                </div>

                <div className='motivation_input_wrapper'>
                    <h1>C</h1>
                    <input type='text' maxlength={1} />
                    <input type='text' maxlength={1} />
                    <input type='text' maxlength={1} />
                    <input type='text' maxlength={1} />
                    <input type='text' maxlength={1} />
                    <input type='text' maxlength={1} />
                    <input type='text' maxlength={1} />
                    <input type='text' maxlength={1} />
                </div>
            </div>
            <div onClick={(() => completedFunction(5))} style={{
                marginTop: '30px',
            }}>
                <Button children={'Submit'} />
            </div>
        </>
    )
}

export default FindMotivation
