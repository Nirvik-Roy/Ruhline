import React from "react";
import "./QuoteModal.css";

const DEFAULT_EYEBROW = "A GENTLE REMINDER";
const DEFAULT_HEADLINE = "You are allowed to take your time.";

const QuoteModal = ({ setModal, data }) => {
  const handleClose = () => setModal(0);

  const quotes = Array.isArray(data?.quotes) ? data.quotes : [];

  return (
    <>
      <div className="quote_modal_overlay" onClick={handleClose} aria-hidden />
      <div
        className="quote_modal"
        role="dialog"
        aria-labelledby="quote-modal-headline"
      >
        <button
          type="button"
          className="quote_modal_close"
          onClick={handleClose}
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark" />
        </button>

        <header className="quote_modal_header">
          <p className="quote_modal_eyebrow">{DEFAULT_EYEBROW}</p>
          <h2 id="quote-modal-headline" className="quote_modal_headline">
            {DEFAULT_HEADLINE}
          </h2>
        </header>

        {quotes.length > 0 && (
          <div className="quote_modal_timeline">
            {quotes.map((item, index) => {
              const side = index % 2 === 0 ? "left" : "right";
              const label =
                item?.label ||
                item?.context ||
                item?.subtitle ||
                item?.tag;

              return (
                <div
                  key={item?.id ?? index}
                  className={`quote_modal_timeline_item ${side}`}
                >
                  <div className="quote_modal_timeline_content">
                    <p className="quote_modal_quote">&ldquo;{item?.quote}&rdquo;</p>
                    {label ? (
                      <span className="quote_modal_label">{label}</span>
                    ) : null}
                  </div>
                  <span className="quote_modal_timeline_dot" aria-hidden />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default QuoteModal;
