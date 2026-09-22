import React from 'react'
import './IntermediateSteps.css'

const normalizePage = (page) => (Array.isArray(page) ? {} : page || {})

const CommonMistakesModal = ({ setModal, data }) => {
  const handleClose = () => setModal(0)
  const page = normalizePage(data?.page)
  const mistakes = [...(page?.mistakes || [])].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
  )

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
          {page?.headline}
        </h2>

        <div className="common_mistakes_grid">
          {mistakes.map((mistake, index) => (
            <article key={mistake.id} className="common_mistakes_card">
              <span className="common_mistakes_badge" aria-hidden="true">
                {index + 1}
              </span>
              <p className="common_mistakes_label">MISTAKE</p>
              <p className="common_mistakes_text" dangerouslySetInnerHTML={{__html:mistake.description}}></p>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}

export default CommonMistakesModal
