import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
function UserRedirectingRoute() {


    const {userInfo} = useSelector((state)=>state.auth) ;
  return (!userInfo)?<Outlet/>:<Navigate to='/dashboard' replace/>
}

export default UserRedirectingRoute