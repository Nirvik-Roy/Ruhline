import React from 'react'

const RedirectingCheckoutModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="rcmX__overlay">
                <div className="rcmX__modal">
                    <button
                        className="rcmX__closeBtn"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        ×
                    </button>

                    <div className="rcmX__iconWrap">
                        <div className="rcmX__iconCircle">
                            <span className="rcmX__icon">→</span>
                        </div>
                    </div>

                    <h2 className="rcmX__title">Redirecting to Checkout</h2>

                    <p className="rcmX__text">
                        Please wait while we securely redirect you to the checkout page to
                        complete your booking.
                    </p>

                    <div className="rcmX__loaderWrap">
                        <div className="rcmX__loaderBar">
                            <div className="rcmX__loaderFill"></div>
                        </div>
                    </div>

                    <p className="rcmX__subText">Preparing your secure checkout...</p>
                </div>
            </div>
        </>
    )
}

export default RedirectingCheckoutModal
