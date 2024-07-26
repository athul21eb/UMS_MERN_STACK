import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
function RedirectingRoute() {

    const {userInfo} = useSelector((state)=>state.auth) ;
  return (!userInfo)?<Outlet/>:<Navigate to='/dashboard' replace/>
}

export default RedirectingRoute