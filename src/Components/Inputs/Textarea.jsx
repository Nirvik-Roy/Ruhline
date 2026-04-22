import React from 'react'
import './Input.css'
const Textarea = ({ label, placeholder, required,onChange,name,value,defaultValue,style }) => {
    return (
        <>
            <div className='input_form'>
                <label>{label} {required && <span>*</span>}</label>
                <textarea style={style} name={name} defaultValue={defaultValue} value={value} onChange={onChange} placeholder={placeholder}></textarea>
            </div>
        </>
    )
}

export default Textarea
