import React from 'react'
import './Input.css'
const Input = ({ label, type, placeholder,required }) => {
  return (
    <>
      <div className='input_form'>
        <label>{label} {required && <span>*</span>}</label>
        <input type={type} placeholder={placeholder} />
      </div>
    </>
  )
}

export default Input
