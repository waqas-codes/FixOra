import React from 'react'

const Card = () => {
  return (
    <div>
        <div className='w-55 h-35 bg-white rounded-2xl p-4 flex flex-col justify-between'>
            <div className='flex items-center justify-between'>
              <h4 className='font-bold text-xs'>TOTAL REVENUE</h4>
              <p className='text-green-700 font-bold px-2 py-1 bg-green-100 rounded-2xl'>+12.4%</p>
            </div>
            <div className='flex flex-col justify-between'>
              <h1 className='font-bold text-2xl'>PKR 1.2M</h1>
              <p className='opacity-60 text-sm'>vs PKR 980k last month</p>
            </div>
        </div>
    </div>
  )
}

export default Card