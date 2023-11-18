import { createSlice } from "@reduxjs/toolkit";


const mailSlice = createSlice({
    name:'mail',
    initialState:{inbox:[],sent:[],unread:0,},
    reducers:{
        addMailToInbox(state,action){
            state.inbox.push(action.payload);
        },
        addMailToSent(state,action){
            state.sent.push(action.payload);
        },
        removeMail(state,action){
            
        }
    }
})

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;