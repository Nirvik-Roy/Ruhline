import React from 'react'
const PaymentInitiateModal = ({
    isOpen,
    onClose,
    title = "Initiating Payment",
    message = "Please wait while we securely connect to the payment gateway.",
    subText = "Do not refresh or close this tab.",
    allowClose = false, // set true if you want user to close it
}) => {
    if (!isOpen) return null;
    return (
        <>
            <div className="payInitX__overlay" role="dialog" aria-modal="true">
                <div className="payInitX__modal">
                    <button
                        className="payInitX__closeBtn"
                        onClick={onClose}
                        aria-label="Close"
                        disabled={!allowClose}
                        style={{ opacity: allowClose ? 1 : 0.4, pointerEvents: allowClose ? "auto" : "none" }}
                    >
                        ×
                    </button>

                    <div className="payInitX__iconWrap" aria-hidden="true">
                        <div className="payInitX__iconCircle">
                            <span className="payInitX__icon">$</span>
                        </div>
                    </div>

                    <h2 className="payInitX__title">{title}</h2>
                    <p className="payInitX__text">{message}</p>

                    <div className="payInitX__loaderWrap" aria-hidden="true">
                        <div className="payInitX__loaderBar">
                            <div className="payInitX__loaderFill"></div>
                        </div>
                    </div>

                    <p className="payInitX__subText">{subText}</p>
                </div>
            </div>
        </>
    )
}

export default PaymentInitiateModal
