import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
function UserPrivateRoutes() {

    const {userInfo} = useSelector((state)=>state.auth) ;
  return userInfo?<Outlet/>:<Navigate to='/' replace/>
}

export default UserPrivateRoutes