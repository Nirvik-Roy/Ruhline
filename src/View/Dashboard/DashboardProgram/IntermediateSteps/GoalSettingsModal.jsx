import React from 'react'
import './IntermediateSteps.css'

const GOAL_SETTING_POINTS = [
  'This could take hours or days become comfortable with this.',
  "Don't let any future goals come in to focus yet.",
  'Concentrate on the last 12 months first, and that will provide the foundation for the next 12 months.',
]

const GoalSettingsModal = ({ setModal }) => {
  const handleClose = () => setModal?.(false)

  return (
    <>
      <div className="modal_wrapper" onClick={handleClose} />
      <div
        className="goal_settings_modal"
        role="dialog"
        aria-labelledby="goal-settings-modal-title"
      >
        <button
          type="button"
          className="goal_settings_modal_close"
          onClick={handleClose}
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark" />
        </button>

        <h2 id="goal-settings-modal-title" className="goal_settings_modal_title">
          You need to stop to get started
        </h2>

        <h3 className="goal_settings_modal_subtitle">
          Reset to Recharge and Restart
        </h3>

        <h4 className="goal_settings_modal_section">Setting Goals</h4>

        <ol className="goal_settings_modal_list">
          {GOAL_SETTING_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ol>

        <h4 className="goal_settings_modal_callout">
          BUT FIRST... DOING THINGS A LITTLE DIFFERENTLY
        </h4>

        <p className="goal_settings_modal_lead">
          We are not going to do &apos;smart goals&apos;:
        </p>

        <p className="goal_settings_modal_body">
          &apos;The problem with SMART goals .... SMART goals have been the
          benchmark for goal setting for decades, ever since George Doran first
          coined the framework in 1981. But as with all theories and
          applications, there&apos;s always room for adaptation. The problem
          with SMART goals is not the fact they should be specific, measurable,
          relevant or timely. These are all important aspects to setting
          gettable goals. What&apos;s limiting is the notion that they need to
          be attainable. If we know we can achieve a goal, then that&apos;s all
          we aim for and as a result we restrict our potential. We stop short of
          greatness because it&apos;s in that extra 1% that we achieve it.
          Whatever goal you first think of, double the results or halve the
          time, and that&apos;s your bold goal. Want to pay off your credit card
          in 12 months? Aim to do it in 6. Keen to run a half marathon? Train
          for a full one. If you don&apos;t achieve your extreme goal that&apos;s
          ok, you&apos;ll probably still surpass the goal you would have set
          originally. But just think - what if you do achieve it?
        </p>
      </div>
    </>
  )
}

export default GoalSettingsModal
