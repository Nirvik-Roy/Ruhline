import Button from '../Button/Button'
import './PrevSubmit.css'
const PrevSubmit = ({ title, objective, firstStep = true, lastStep = false, onPrevious, onSumbit, previousButton = true, loading, loadingText }) => {
    return (
        <>
            <div className='values_head'>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '10px',
                    flexWrap: 'wrap'
                }}>
                    <h4>{title}</h4>
                    <h6 style={{
                        fontSize: '15px',
                        color: 'var(--text-color)',
                        fontWeight: '400'
                    }}>{objective} </h6>
                </div>


                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10'
                }}>
                    {previousButton && <Button onClick={!firstStep && onPrevious} styles={firstStep ? {
                        backgroundColor: 'transparent',
                        color: 'rgba(111, 124, 142, 1)'
                    } : {
                        backgroundColor: 'transparent',
                        color: 'rgba(206, 115, 86, 1)'
                    }} children={'Previous'} />}

                    <Button loading={loading} loadingText={ lastStep?'Submitting...' : loadingText} onClick={ onSumbit  } children={lastStep ? 'Submit' : 'Save & Continue'} />
                </div>
            </div>
        </>
    )
}

export default PrevSubmit
