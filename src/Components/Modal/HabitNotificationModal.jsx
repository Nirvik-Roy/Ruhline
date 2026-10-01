import React, { useCallback, useEffect, useState } from "react";
import "./HabitNotificationModal.css";

const SPLASH_TONE = {
  default: "default",
  success: "success",
  error: "error",
  warning: "warning",
};

const STATUS_ICON = {
  success: "fa-solid fa-check",
  error: "fa-solid fa-xmark",
  warning: "fa-solid fa-exclamation",
};

const SplashDecor = ({ tone = SPLASH_TONE.default }) => (
  <div
    className={`habit_notif_splash habit_notif_splash--${tone}`}
    aria-hidden
  >
    <svg viewBox="0 0 88 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse
        className="habit_notif_blob"
        cx="28"
        cy="88"
        rx="52"
        ry="44"
      />
      <circle className="habit_notif_drop" cx="58" cy="28" r="5" />
      <circle className="habit_notif_drop" cx="70" cy="42" r="3.5" />
      <circle className="habit_notif_drop" cx="48" cy="48" r="2.5" />
    </svg>
  </div>
);

/**
 * @typedef {'reminder' | 'completion' | 'status'} HabitNotificationType
 * @typedef {'success' | 'error' | 'warning'} HabitNotificationStatus
 */

/**
 * Top-right habit notification modal.
 *
 * Types:
 * - reminder: habit title, description, "Mark as complete"
 * - completion: habit title, description, full/partial radio question
 * - status: success / error / warning message toast
 */
const HabitNotificationModal = ({
  open = true,
  type = "reminder",
  title = "",
  description = "",
  status = "success",
  completionValue = null,
  onCompletionChange,
  questionLabel = "How much did you complete today?",
  markCompleteLabel = "Mark as complete",
  onMarkComplete,
  onClose,
  markCompleteLoading = false,
  completionDisabled = false,
  className = "",
}) => {
  const [mounted, setMounted] = useState(open);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setExiting(false);
    } else if (mounted) {
      setExiting(true);
    }
  }, [open, mounted]);

  const requestClose = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    onClose?.();
  }, [exiting, onClose]);

  const handleAnimationEnd = useCallback((e) => {
    if (e.animationName === "habit_notif_slide_out") {
      setMounted(false);
      setExiting(false);
    }
  }, []);

  if (!mounted) return null;

  const splashTone =
    type === "status"
      ? SPLASH_TONE[status] || SPLASH_TONE.success
      : SPLASH_TONE.default;

  const cardClass = [
    "habit_notif_card",
    type === "reminder" ? "habit_notif_card--reminder" : "",
    type === "completion" ? "habit_notif_card--completion" : "",
    type === "status" ? "habit_notif_card--status" : "",
    exiting ? "habit_notif_card--exiting" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="habit_notif_anchor" role="presentation">
      <div
        className={cardClass}
        role={type === "status" ? "status" : "dialog"}
        aria-live={type === "status" ? "polite" : undefined}
        aria-labelledby="habit-notif-title"
        onAnimationEnd={handleAnimationEnd}
      >
        <SplashDecor tone={splashTone} />

        {type === "reminder" && (
          <>
            <div className="habit_notif_body habit_notif_body--with_action">
              <h2 id="habit-notif-title" className="habit_notif_title">
                {title}
              </h2>
              {description ? (
                <p className="habit_notif_desc">{description}</p>
              ) : null}
            </div>
            <div className="habit_notif_actions">
              <button
                type="button"
                className="habit_notif_mark_btn"
                onClick={onMarkComplete}
                disabled={markCompleteLoading}
              >
                {markCompleteLabel}
              </button>
            </div>
          </>
        )}

        {type === "completion" && (
          <div className="habit_notif_body">
            <h2 id="habit-notif-title" className="habit_notif_title">
              {title}
            </h2>
            {description ? (
              <p className="habit_notif_desc">{description}</p>
            ) : null}
            <hr className="habit_notif_divider" />
            <p className="habit_notif_question">
              {questionLabel}
              <span className="habit_notif_required" aria-hidden>*</span>
            </p>
            <div className="habit_notif_radios" role="radiogroup" aria-label={questionLabel}>
              <label className="habit_notif_radio">
                <input
                  type="radio"
                  name="habit-completion-level"
                  value="full"
                  checked={completionValue === "full"}
                  disabled={completionDisabled}
                  onChange={() => onCompletionChange?.("full")}
                />
                <span className="habit_notif_radio_mark" aria-hidden />
                Completed Fully
              </label>
              <label className="habit_notif_radio">
                <input
                  type="radio"
                  name="habit-completion-level"
                  value="partial"
                  checked={completionValue === "partial"}
                  disabled={completionDisabled}
                  onChange={() => onCompletionChange?.("partial")}
                />
                <span className="habit_notif_radio_mark" aria-hidden />
                Completed Partially
              </label>
            </div>
          </div>
        )}

        {type === "status" && (
          <div className="habit_notif_body">
            <div className="habit_notif_status_row">
              <span
                className={`habit_notif_status_icon habit_notif_status_icon--${status}`}
                aria-hidden
              >
                <i className={STATUS_ICON[status] || STATUS_ICON.success} />
              </span>
              <div className="habit_notif_status_text">
                <h2 id="habit-notif-title" className="habit_notif_title">
                  {title}
                </h2>
                {description ? (
                  <p className="habit_notif_desc">{description}</p>
                ) : null}
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          className="habit_notif_close"
          onClick={requestClose}
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark" />
        </button>
      </div>
    </div>
  );
};

export const HabitReminderNotification = (props) => (
  <HabitNotificationModal type="reminder" {...props} />
);

export const HabitCompletionNotification = (props) => (
  <HabitNotificationModal type="completion" {...props} />
);

export const HabitStatusNotification = (props) => (
  <HabitNotificationModal type="status" {...props} />
);

export default HabitNotificationModal;
