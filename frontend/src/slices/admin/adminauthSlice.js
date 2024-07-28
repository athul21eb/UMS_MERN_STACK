import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    adminInfo: localStorage.getItem("adminInfo") ? JSON.parse(localStorage.getItem("adminInfo")) : null,
}
const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        SetAdminCredentials: (state, action) => {
            state.adminInfo = action.payload;
            localStorage.setItem("adminInfo", JSON.stringify(action.payload));
        },
        ClearAdminCredentials: (state, action) => {
            state.adminInfo = null;
            localStorage.removeItem("adminInfo");
        }
    }

})

export const { SetAdminCredentials, ClearAdminCredentials } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;