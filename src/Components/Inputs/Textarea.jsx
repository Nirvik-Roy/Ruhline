import React from 'react'
import './Input.css'
const Textarea = ({ label, placeholder, required }) => {
    return (
        <>
            <div className='input_form'>
                <label>{label} {required && <span>*</span>}</label>
                <textarea placeholder={placeholder}></textarea>
            </div>
        </>
    )
}

export default Textarea
