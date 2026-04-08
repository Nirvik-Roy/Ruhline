import React from 'react'

const DeleteProgramModal = ({
    isOpen,
    onClose,
    onDelete,
    programName = "this program",
    isDeleting = false,
}) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="dpmX__overlay" role="dialog" aria-modal="true">
                <div className="dpmX__modal">
                    <button
                        className="dpmX__closeBtn"
                        onClick={onClose}
                        aria-label="Close delete modal"
                        disabled={isDeleting}
                    >
                        ×
                    </button>

                    <div className="dpmX__iconWrap">
                        <div className="dpmX__iconCircle" aria-hidden="true">
                            <span className="dpmX__icon">!</span>
                        </div>
                    </div>

                    <h2 className="dpmX__title">Delete Program?</h2>

                    <p className="dpmX__text">
                        Are you sure you want to delete <b>{programName}</b>? This action
                        cannot be undone.
                    </p>

                    <div className="dpmX__actions">
                        <button
                            className="dpmX__secondaryBtn"
                            onClick={onClose}
                            disabled={isDeleting}
                        >
                            Cancel
                        </button>

                        <button
                            className="dpmX__dangerBtn"
                            onClick={onDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Deleting..." : "Yes, Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteProgramModal
