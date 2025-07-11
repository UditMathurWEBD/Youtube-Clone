import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name : "auth",
    initialState : {
      user : null,
      token : null ,
      isAuthenticated : false
    },
    reducers : {
        loginSuccess : (state,action)=>{
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
        },
        logout : (state,action)=>{
             state.user = null;
                state.token = null;
                state.isAuthenticated = false;
        }
    }
})


export const { loginSuccess,logout} = authSlice.actions;
export default authSlice.reducer;