import React,{useEffect,useRef,useState} from 'react'
import { Outlet } from 'react-router-dom'   
import { useRefreshMutation } from '../../slices/user/usersApiSlice'
import { useAdminRefreshMutation } from '../../slices/admin/adminApiSlice'

import usePersist from '../../hooks/usePersist'
import { useDispatch, useSelector } from 'react-redux'
import { ClearAdminCredentials, selectAdminCurrentToken } from '../../slices/admin/adminauthSlice.js' 
import { Link } from 'react-router-dom'


function Persist() {
const dispatch = useDispatch()
    const [persist] = usePersist();
    const token = useSelector(selectAdminCurrentToken);
    const effectRan = useRef(false) ;

    const [trueSuccess,setTrueSuccess] = useState(false);

// const [refresh,{isLoading,isSuccess,isError,error,isUninitialized}] = useRefreshMutation();
const [adminRefresh,{isLoading,isSuccess,isError,error,isUninitialized}] = useAdminRefreshMutation();

useEffect(()=>{
    if(effectRan.current ===true ){
        const verifyRefreshToken = async()=>{
            console.log("verify refresh token");    
            try {
                // const response{accessToken} = 
                await adminRefresh(token);
                // 
                setTrueSuccess(true);


            } catch (error) {
                console.log(error);
                
            }
        }

        if(!token && persist) verifyRefreshToken();
    }

    return () => effectRan.current = true;
},[])

let content 
if(!persist){ //persist :no
   if(token){
    content=<Outlet/>
   }else{

    dispatch(ClearAdminCredentials());

    
    console.log("non persist");
    content = <p>
    <h1>{error?.data?.message||"NO persist data"}</h1>
    <Link to="/admin" replace>Please login again</Link>
</p>
   }
}else if(isLoading){ //persist :yes,token:no
    console.log("loading")
    content = <p>Loading...</p>
}else if(isError){ //persist :yes,token:no
    console.log("error")
    content = (
        <p>
            {error?.data?.message}
            <Link to="/admin" replace>Please login again</Link>
        </p>
    )
}else if(isSuccess&&trueSuccess){ //persist :yes,token:yes
console.log("success");
content = <Outlet/>

}else if(token&&isUninitialized){ //persist :yes,token:yes

    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet/>
}



  return content;
}

export default Persist