import { useEffect, useState } from "react";



const useUserPersist = ()=>{
    const [Userpersist,setUserPersist] = useState(JSON.parse(localStorage.getItem("Userpersist"))||false);

    useEffect(()=>{
        localStorage.setItem("Userpersist",JSON.stringify(Userpersist));
    },[Userpersist]);
    return [Userpersist,setUserPersist];
}

export default useUserPersist;