import React from 'react'
import './Input.css'
const Textarea = ({ label, placeholder, required,onChange,name,value }) => {
    return (
        <>
            <div className='input_form'>
                <label>{label} {required && <span>*</span>}</label>
                <textarea name={name} value={value} onChange={onChange} placeholder={placeholder}></textarea>
            </div>
        </>
    )
}

export default Textarea
