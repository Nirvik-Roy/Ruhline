import React from 'react'
import './Modal.css'
const Modal = ({ children }) => {
    return (
        <>
            <div className='modal_wrapper_overlay'></div>
            <div className='modal_wrapper_div'>
                {children}
            </div>
        </>
    )
}

export default Modal
