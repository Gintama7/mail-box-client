import { createSlice } from "@reduxjs/toolkit";


const mailSlice = createSlice({
    name:'mail',
    initialState:{inbox:[],sent:[],unread:0,},
    reducers:{
        addMail(state,action){
            state.inbox.push(action.payload);
        },
        removeMail(state,action){
            
        }
    }
})

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;