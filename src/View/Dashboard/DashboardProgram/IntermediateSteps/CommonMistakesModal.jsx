import React from 'react'
import './IntermediateSteps.css'

const COMMON_MISTAKES = [
  'SETTING UNREALISTIC GOALS',
  'NEGLECTING GOALS THAT BRING YOU JOY',
  'UNDERESTIMATING COMPLETION TIME',
  'NOT APPRECIATING FAILURE',
  'SETTING "OTHER PEOPLE\'S GOALS"',
  'NOT REVIEWING PROGRESS',
  'SETTING "NEGATIVE" GOALS',
  'SETTING TOO MANY GOALS',
]

const CommonMistakesModal = ({ setModal }) => {
  const handleClose = () => setModal(0)

  return (
    <>
      <div className="modal_wrapper" onClick={handleClose} />
      <div
        className="common_mistakes_modal"
        role="dialog"
        aria-labelledby="common-mistakes-modal-title"
      >
        <button
          type="button"
          className="common_mistakes_modal_close"
          onClick={handleClose}
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark" />
        </button>

        <h2
          id="common-mistakes-modal-title"
          className="common_mistakes_modal_title"
        >
          Eight Most Common Mistakes
        </h2>

        <div className="common_mistakes_grid">
          {COMMON_MISTAKES.map((mistake, index) => (
            <article key={mistake} className="common_mistakes_card">
              <span className="common_mistakes_badge" aria-hidden="true">
                {index + 1}
              </span>
              <p className="common_mistakes_label">MISTAKE</p>
              <p className="common_mistakes_text">{mistake}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}

export default CommonMistakesModal
