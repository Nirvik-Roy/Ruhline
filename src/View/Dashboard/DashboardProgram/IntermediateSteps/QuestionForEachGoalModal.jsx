import React from 'react'
import './IntermediateSteps.css'

const GOAL_BADGES = ['Reward', 'Motivation', 'Action']

const GOAL_QUESTIONS = [
  {
    label: 'Motivation:',
    text: 'Why do you want to achieve this?',
  },
  {
    label: 'Reward:',
    text: 'What will you do to reward yourself when you achieve this?',
  },
  {
    label: 'Next Steps:',
    text: 'what are the very next actions you need to take to kickstart your success?',
  },
]

const QuestionForEachGoalModal = ({ setModal }) => {
  const handleClose = () => setModal(0)

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
          Question for each Goal- Why?
        </h2>

        <div className="goal_question_modal_intro">
          <p>
            The final part to goal setting is to understand what drives you.
            What will keep you going when the going gets tough?
          </p>
          <p>
            If you can&apos;t find a meaningful goal, then consider if it&apos;s
            really a goal you should be working toward this year. Chances are,
            it probably isn&apos;t a priority ...
          </p>
          <p>
            As humans, we&apos;re hardwired to seek pleasure, so if there&apos;s
            no real desire to achieve something, we&apos;re not going to put
            much effort in, are we?
          </p>
        </div>

        <div className="goal_question_badges">
          {GOAL_BADGES.map((badge) => (
            <span key={badge} className="goal_question_badge">
              {badge}
            </span>
          ))}
        </div>

        <h3 className="goal_question_modal_section">
          For Every Goal You have, Answer these 3 Questions:
        </h3>

        <ol className="goal_question_modal_list">
          {GOAL_QUESTIONS.map(({ label, text }) => (
            <li key={label}>
              <strong>{label}</strong> {text}
            </li>
          ))}
        </ol>

        <p className="goal_question_modal_quote">
          &ldquo;Small rewards lead to bigger goals&rdquo;
        </p>
      </div>
    </>
  )
}

export default QuestionForEachGoalModal
