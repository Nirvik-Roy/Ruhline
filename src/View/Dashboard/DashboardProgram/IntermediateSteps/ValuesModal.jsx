import React from 'react'
import './IntermediateSteps.css'
import arrowIcon from '../../../../assets/Images/Group5.svg'
const VALUES_POINTS = [
  'Values are unique to each individual.',
  'Values are a set of attitudes.',
  'They motivate us and guide our decisions.',
  'They govern our behaviours and guide the way we look/ perceive and show up in the world.',
  'Each individual seeks to achieve certain goals in life, and ideally, their values are in tune with these goals.',
  'Living a life in tune with your values will help avoid disappointment, unhappiness and feeling disorientated with life.',
  'Understanding and being able to identify your values will create a life of purpose, passion and inspiration.',
]

const ValuesBullet = () => (
  <img src={arrowIcon}/>
)

const ValuesModal = ({ setModal }) => {
  const handleClose = () => setModal(0)

  return (
    <>
      <div className="modal_wrapper" onClick={handleClose} />
      <div className="values_modal" role="dialog" aria-labelledby="values-modal-title">
        <button
          type="button"
          className="values_modal_close"
          onClick={handleClose}
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark" />
        </button>
        <h2 id="values-modal-title" className="values_modal_title">
          What are Values?
        </h2>
        <ul className="values_modal_list">
          {VALUES_POINTS.map((point) => (
            <li key={point} className="values_modal_item">
              <ValuesBullet />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ValuesModal
