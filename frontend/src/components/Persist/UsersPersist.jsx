import React,{useEffect,useRef,useState} from 'react'
import { Outlet } from 'react-router-dom'   
import { useRefreshMutation } from '../../slices/user/usersApiSlice'



import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import useUserPersist from '../../hooks/useUserPersist.jsx'
import { ClearCredentials } from '../../slices/user/authSlice.js'


function UserPersistChecking() {

    const dispatch = useDispatch();

    const [Userpersist] = useUserPersist();
    const{ token} = useSelector(state=>state.auth);
    
    const effectRan = useRef(false) ;

    const [trueSuccess,setTrueSuccess] = useState(false);

const [refresh,{isLoading,isSuccess,isError,error,isUninitialized}] = useRefreshMutation();

useEffect(()=>{
    if(effectRan.current ===true ){
        const verifyRefreshToken = async()=>{
            console.log("verify refresh token");    
            try {
                // const response{accessToken} = 
                await refresh(token);
                // 
                setTrueSuccess(true);

                
            } catch (error) {
                console.log(error);
                
            }
        }

        if(!token && Userpersist) verifyRefreshToken();
    }

    return () => effectRan.current = true;
},[])

let content 
if(!Userpersist){ //UserPersist :no
   if(token){
    content=<Outlet/>
   }else{

dispatch(ClearCredentials());
    console.log("non UserPersist");
    content = <p>
        <h1> {error?.data?.message||"NO UserPersist data"}</h1>
   
    <Link to="/" replace>Please login again</Link>
</p>
   }
}else if(isLoading){ //UserPersist :yes,token:no
    console.log("loading")
    content = <p>Loading...</p>
}else if(isError){ //UserPersist :yes,token:no
    console.log("error")
    content = (
        <p>
            {error?.data?.message}
            <Link to="/" replace>Please login again</Link>
        </p>
    )
}else if(isSuccess&&trueSuccess){ //UserPersist :yes,token:yes
console.log("success");
content = <Outlet/>

}else if(token&&isUninitialized){ //UserPersist :yes,token:yes

    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet/>
}



  return content;
}

export default UserPersistChecking