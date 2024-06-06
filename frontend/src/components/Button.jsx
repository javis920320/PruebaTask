import React from 'react'

const Button = ({children}) => {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded shadow-sm hover:bg-blue-600">{children}</button>
  )
}

export default Button
