import { createSlice } from "@reduxjs/toolkit";


const mailSlice = createSlice({
    name:'mail',
    initialState:{inbox:[],sent:[],unread:0,read:false},
    reducers:{
        addMailToInbox(state,action){
            state.inbox.push(action.payload);
            state.unread+=1;
        },
        addMailToSent(state,action){
            state.sent.push(action.payload);
        },
        removeMail(state,action){
            
        },
        readMail(state)
        {
            state.unread-=1;
            state.read=true;
        }
    }
})

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;