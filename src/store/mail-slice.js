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
            const {id,type}= action.payload;
            // const item = state.inbox.find( itm => itm.id === id);  
            if(type === 'inbox'){
                state.inbox = state.inbox.filter(itm=> itm.id !== id );
            }
            else{
                state.sent = state.sent.filter(itm=> itm.id !== id );
            }
            
        },
        readMail(state)
        {
            if(state.unread>=0)
           { state.unread-=1;
            state.read=true;
           }
        }
    }
})

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;