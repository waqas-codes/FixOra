import React from 'react'

const Button = (props) => {
    console.log(props)
  return (
    <div className='flex items-center w-50 gap-3 text-4 text-black hover:bg-white border-0 rounded-2xl py-2 pl-4 hover:cursor-pointer hover:text-blue-400'>
            <props.dashoborIcon className="text-xl text-gray-600"/> 
            <button className='hover:cursor-pointer'>{props.name}</button>
        </div>
  )
}

export default Button