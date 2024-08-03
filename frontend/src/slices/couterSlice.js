 import { createSlice } from "@reduxjs/toolkit";

 const counterSlice = createSlice({

    name:"couter",
    initialState:{
        counter:0
    },
    reducers:{
        Increament:(state,action)=>{
            state.counter +=1;
        },
        Decreament:(state)=>{
            state.counter-=1;
        }
    }
 })

 export const {Increament,Decreament} = counterSlice.actions;
 export default counterSlice.reducer