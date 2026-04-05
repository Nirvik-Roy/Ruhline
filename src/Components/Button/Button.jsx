import React from 'react'
import './Button.css'
const Button = ({children,styles,onClick}) => {
  return (
    <>
      <div style={styles} onClick={onClick} className='brown_button'>{children}</div>
    </>
  )
}

export default Button
