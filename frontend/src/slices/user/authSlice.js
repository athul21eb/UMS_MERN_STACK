import { createSlice ,} from "@reduxjs/toolkit";
import {useSelector } from "react-redux"


const initialState = {
    userInfo:  localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null,
   token:null,
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SetCredentials: (state, action) => {
            const {accessToken,id,name,email,phone,photo} = action.payload;
            state.token = accessToken||state.token;
           
            if(name){
                state.userInfo = {id,name,email,phone,photo};
                console.log("setted user local storage");
                localStorage.setItem("userInfo",JSON.stringify({id,name,email,phone,photo}));
            }
           
        },
        ClearCredentials: (state, action) => {
            state.token = null;
            state.userInfo = null;
            localStorage.removeItem("userInfo");
            
        }
    }

})

export const { SetCredentials, ClearCredentials } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) =>state.auth.token;