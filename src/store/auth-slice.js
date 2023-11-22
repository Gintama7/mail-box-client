import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name:'authentication',
    initialState:{isAuthenticated: false, token:'',email:''},
    reducers:{
        login(state,action){
            state.isAuthenticated = true;
            const {email,token}= action.payload;
            state.email = email;
            state.token = token;
            localStorage.setItem('token',token); 
            localStorage.setItem('email',email);    
        },
        logout(state){
            state.isAuthenticated=false;
            state.token = '';
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('mailTwo');
        }
    }
})


export const authActions = authSlice.actions;
export default authSlice.reducer;