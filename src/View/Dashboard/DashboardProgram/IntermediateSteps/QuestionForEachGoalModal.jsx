import React from 'react'
import './IntermediateSteps.css'

const GOAL_BADGES = ['Reward', 'Motivation', 'Action']

const normalizePage = (page) => (Array.isArray(page) ? {} : page || {})

const QuestionForEachGoalModal = ({ setModal, data }) => {
  const handleClose = () => setModal(0)
  const page = normalizePage(data?.page)

  const questions = [1, 2, 3]
    .map((n) => ({
      key: n,
      label: page?.[`question_heading_${n}`],
      text: page?.[`question_description_${n}`],
    }))
    .filter((q) => q.label || q.text)

  return (
    <>
      <div className="modal_wrapper" onClick={handleClose} />
      <div
        className="goal_question_modal"
        role="dialog"
        aria-labelledby="goal-question-modal-title"
      >
        <button
          type="button"
          className="goal_question_modal_close"
          onClick={handleClose}
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark" />
        </button>

        <h2 id="goal-question-modal-title" className="goal_question_modal_title">
          {page?.headline_1}
        </h2>

        <div className="goal_question_modal_intro">
          {page?.headline_2 && <p>{page.headline_2}</p>}
          {page?.headline_3 && <p>{page.headline_3}</p>}
          {page?.headline_4 && <p>{page.headline_4}</p>}
        </div>

        <div className="goal_question_badges">
          {GOAL_BADGES.map((badge) => (
            <span key={badge} className="goal_question_badge">
              {badge}
            </span>
          ))}
        </div>

        {page?.headline_5 && (
          <h3 className="goal_question_modal_section">{page.headline_5}</h3>
        )}

        <ol className="goal_question_modal_list">
          {questions.map(({ key, label, text }) => (
            <li key={key}>
              {label && <strong>{label}</strong>} {text}
            </li>
          ))}
        </ol>

        {page?.quote && (
          <p className="goal_question_modal_quote">
            &ldquo;{page.quote}&rdquo;
          </p>
        )}
      </div>
    </>
  )
}

export default QuestionForEachGoalModal
