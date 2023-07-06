import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

export default function WithNav({activeTab}) {  

  return (
    <div>
      <Navbar activeTab={activeTab} />
      <Outlet />
    </div>
  )
}
