import React, { useEffect } from 'react'
import './Modal.css'
const Modal = ({ children, handleModal }) => {
    useEffect(() => {
        document.body.style.overflowY = 'hidden'
        return () => {
            document.body.style.overflowY = '';
        };
    }, [])
    return (
        <>
            <div className='modal_wrapper_overlay' onClick={(() => handleModal(0))}></div>
            <div className='modal_wrapper_div'>
                {children}
                <div className='modal_cross_div' onClick={(() => handleModal(0))}>
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
        </>
    )
}

export default Modal
