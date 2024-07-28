import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    adminUsersCollection:  [],
}
const adminUsersCollection = createSlice({
    name: "adminUsersCollection",
    initialState,
    reducers: {
        SetAdminUsersCollection: (state, action) => {
            state.adminUsersCollection = action.payload;
            
        },
        ClearAdminUsersCollection: (state, action) => {
            state.adminUsersCollection = null;
      
        }
    }

})

export const { SetAdminUsersCollection, ClearAdminUsersCollection } = adminUsersCollection.actions;
export default adminUsersCollection.reducer;