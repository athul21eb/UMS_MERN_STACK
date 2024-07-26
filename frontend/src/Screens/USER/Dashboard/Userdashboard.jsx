import React from 'react'
import { useSelector } from 'react-redux'
import Image from 'react-bootstrap/Image'

function Userdashboard() {
    const {userInfo} = useSelector(state=>state.auth)  ;
  return (
<>

<div className="d-flex justify-content-center height-100px">
    <Image src={userInfo.photo} fluid style={{ borderRadius: "50%", height: "300px", width: "300px" }} />
  </div>

    <div className='bold'><h1 className='text-center'>Welcome , {userInfo.name} </h1> </div>

</>
  )
}

export default Userdashboard