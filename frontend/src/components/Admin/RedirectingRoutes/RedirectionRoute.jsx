import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
function AdminRedirectingRoute() {

    const {adminInfo} = useSelector((state)=>state.adminAuth) ;
  return (!adminInfo)?<Outlet/>:<Navigate to='/admin/dashboard' replace/>
}

export default AdminRedirectingRoute