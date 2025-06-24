import React from 'react'
import { Outlet } from 'react-router-dom'
function AdminLayout() {
  return (
    <div className='max-w-[1520px] mx-auto'>
        <h1 className='font-bold text-2xl flex items-center justify-center'>Admin panel</h1>
        <Outlet/>

    </div>
  )
}

export default AdminLayout