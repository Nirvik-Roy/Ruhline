import React from "react";

const PaymentFailedModal = ({
    isOpen,
    onClose,
    onTryAgain,
    title = "Payment Failed",
    message = "We couldn’t process your payment. Please check your details and try again.",
    details, // optional string e.g. "Card declined" / "Session expired"
}) => {
    if (!isOpen) return null;

    return (
        <div className="payFailX__overlay" role="dialog" aria-modal="true">
            <div className="payFailX__modal">
                <button
                    className="payFailX__closeBtn"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>

                <div className="payFailX__iconWrap" aria-hidden="true">
                    <div className="payFailX__iconCircle">
                        <span className="payFailX__icon">!</span>
                    </div>
                </div>

                <h2 className="payFailX__title">{title}</h2>

                <p className="payFailX__text">{message}</p>

                {details ? <p className="payFailX__details">{details}</p> : null}

                <div className="payFailX__actions">
                    <button className="payFailX__secondaryBtn" onClick={onClose}>
                        Close
                    </button>
                    <button className="payFailX__primaryBtn" onClick={onTryAgain}>
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailedModal;