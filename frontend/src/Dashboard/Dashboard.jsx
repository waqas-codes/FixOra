import React from 'react'
import Sidebar from './Sidebar'
import Main from './Main'

const Dashboard = () => {
  return (
    <div className='w-screen bg-gray-100 h-full flex items-center'>
        <Sidebar />
        <Main />
    </div> 
  )
}

export default Dashboard