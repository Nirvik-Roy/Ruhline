import React from 'react'
import './Input.css'
const Input = ({ label, type, placeholder,required,value,defaultValue,onChange,name }) => {
  return (
    <>
      <div className='input_form'>
        <label>{label} {required && <span>*</span>}</label>
        <input type={type} onChange={onChange} name={name} value={value} defaultValue={defaultValue} placeholder={placeholder} />
      </div>
    </>
  )
}

export default Input
