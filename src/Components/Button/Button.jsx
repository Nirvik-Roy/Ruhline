import React from 'react'
import './Button.css'
const Button = ({children,styles}) => {
  return (
    <>
      <div style={styles} className='brown_button'>{children}</div>
    </>
  )
}

export default Button
