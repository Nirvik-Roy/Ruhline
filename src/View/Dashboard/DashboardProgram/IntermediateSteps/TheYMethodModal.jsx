import React from 'react'
import './IntermediateSteps.css'

const Y_METHOD_STEPS = [
  { step: 1, label: 'REFLECTION', detail: '(BUCKETS & TEST)', side: 'right' },
  { step: 2, label: 'BRAINSTORM', detail: '(ACTION & TIME)', side: 'left' },
  { step: 3, label: 'UNDERSTANDING', detail: '(THE Y & HOW)', side: 'right' },
  { step: 4, label: 'GIANT ROCKS', detail: '(MOTIVATION & REWARDS)', side: 'left' },
  { step: 5, label: 'HABITS & TRACKING', detail: '(MONTHLY TRACKER)', side: 'right' },
  
]

const TheYMethodModal = ({ setModal }) => {
  const handleClose = () => setModal?.(false)

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
          The Y Method
        </h2>
        <div className="y_method_timeline">
          {Y_METHOD_STEPS.map(({ step, label, detail, side }) => (
            <div
              key={step}
              className={`y_method_step y_method_step--${side}`}
            >
              <div className="y_method_step_content">
                <span className="y_method_step_pill">Step {step}</span>
                <p className="y_method_step_text">
                  {label}
                  <br />
                  {detail}
                </p>
              </div>
              <span className="y_method_step_dot" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default TheYMethodModal
