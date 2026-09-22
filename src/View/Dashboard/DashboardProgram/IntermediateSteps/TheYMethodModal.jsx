import React from 'react'
import './IntermediateSteps.css'

const normalizePage = (page) => (Array.isArray(page) ? {} : page || {})

const TheYMethodModal = ({ setModal, data }) => {
  const handleClose = () => setModal(0)
  const page = normalizePage(data?.page)
  const steps = [...(page?.steps || [])].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
  )

  return (
    <>
      <div className="modal_wrapper" onClick={handleClose} />
      <div
        className="y_method_modal"
        role="dialog"
        aria-labelledby="y-method-modal-title"
      >
        <button
          type="button"
          className="y_method_modal_close"
          onClick={handleClose}
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark" />
        </button>
        <h2 id="y-method-modal-title" className="y_method_modal_title">
          {page?.headline}
        </h2>
        <div className="y_method_timeline">
          {steps.map((step, index) => {
            const side = index % 2 === 0 ? 'right' : 'left'
            return (
              <div
                key={step.id}
                className={`y_method_step y_method_step--${side}`}
              >
                <div className="y_method_step_content">
                  <span className="y_method_step_pill">Step {index + 1}</span>
                  <p className="y_method_step_text" dangerouslySetInnerHTML={{__html:step.description}}></p>
                </div>
                <span className="y_method_step_dot" aria-hidden="true" />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default TheYMethodModal
