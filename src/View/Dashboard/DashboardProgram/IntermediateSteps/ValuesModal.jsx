import React from 'react'
import './IntermediateSteps.css'
import arrowIcon from '../../../../assets/Images/Group5.svg'

const ValuesBullet = () => (
  <img src={arrowIcon}/>
)

const normalizePage = (page) => (Array.isArray(page) ? {} : page || {})

const ValuesModal = ({ setModal, data }) => {
  const handleClose = () => setModal(0)
  const page = normalizePage(data?.page)
  const points = [...(page?.points || [])].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
  )

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
          {page?.headline}
        </h2>
        <ul className="values_modal_list">
          {points.map((point) => (
            <li key={point.id} className="values_modal_item">
              <ValuesBullet />
              <span dangerouslySetInnerHTML={{__html:point.description}}></span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ValuesModal
