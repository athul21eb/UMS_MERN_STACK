import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    adminInfo: localStorage.getItem("adminInfo")?JSON.parse(localStorage.getItem("adminInfo")):null,
    token : null,
}
const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        SetAdminCredentials: (state, action) => {
            const {accessToken,id,name,email,phone,photo} = action.payload;
            state.token = accessToken||state.token;
           
            if(email){
                state.adminInfo = {id,name,email,phone,photo};
                console.log("serted local storage");
                localStorage.setItem("adminInfo",JSON.stringify({id,name,email,phone,photo}));
            }
            
         
        },
        ClearAdminCredentials: (state, action) => {
            state.adminInfo = null;
            state.token = null;
            localStorage.removeItem("adminInfo");
      
        }
    }

})

export const { SetAdminCredentials, ClearAdminCredentials } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
export const selectAdminCurrentToken = (state) =>state.adminAuth.token;