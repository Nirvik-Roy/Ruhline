import React, { useEffect } from 'react'
import './Modal.css'
import { useDispatch } from 'react-redux'
import { closeGlobalLogin } from '../../../Store/Slices/Loginslice/GlobalLoginSlice'
const Modal = ({ children, handleModal, closeGlobalLoginflag = false }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        document.body.style.overflowY = 'hidden'
        return () => {
            document.body.style.overflowY = '';
        };
    }, [])

    const CLoseLoginModal = () => {
        if (closeGlobalLoginflag) {
            dispatch(closeGlobalLogin())
        } else {
            return null
        }
    }
    return (
        <>
            <div className='modal_wrapper_overlay' onClick={(() => {
                handleModal(0)
                CLoseLoginModal()
            })}></div>
            <div className='modal_wrapper_div'>
                {children}
                <div className='modal_cross_div' onClick={(() => {
                    handleModal(0)
                    CLoseLoginModal()
                })}>
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
        </>
    )
}

export default Modal
