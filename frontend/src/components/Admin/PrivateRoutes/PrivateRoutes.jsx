import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
function PrivateRoutes() {

    const {adminInfo} = useSelector((state)=>state.adminAuth) ;
  return adminInfo?<Outlet/>:<Navigate to='/' replace/>
}

export default PrivateRoutes