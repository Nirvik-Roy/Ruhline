import React from 'react'
import './IntermediateSteps.css'

const normalizePage = (page) => (Array.isArray(page) ? {} : page || {})

const GoalSettingsModal = ({ setModal, data }) => {
  const handleClose = () => setModal(0)
  const page = normalizePage(data?.page)
  const options = [...(page?.options || [])].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
  )

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
          {page?.headline}
        </h2>

        {page?.sub_heading_1 && (
          <h3 className="goal_settings_modal_subtitle">
            {page.sub_heading_1}
          </h3>
        )}

        {page?.sub_heading_2 && (
          <h4 className="goal_settings_modal_section">{page.sub_heading_2}</h4>
        )}

        <ol className="goal_settings_modal_list">
          {options.map((option) => (
            <li key={option.id} dangerouslySetInnerHTML={{__html:option.description}}></li>
          ))}
        </ol>

        {page?.quote && (
          <h4 className="goal_settings_modal_callout">{page.quote}</h4>
        )}

        {page?.description_2 && (
          <p className="goal_settings_modal_body">{page.description_2}</p>
        )}
      </div>
    </>
  )
}

export default GoalSettingsModal
