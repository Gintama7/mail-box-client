import { createSlice } from "@reduxjs/toolkit";


const mailSlice = createSlice({
    name:'mail',
    initialState:{inbox:[],sent:[],unreadInbox:0,unreadSent:0},
    reducers:{
        addMailToInbox(state,action){
            state.inbox.push(action.payload);
            if(!action.payload.read)
          {  state.unreadInbox+=1;}
        },
        addMailToSent(state,action){
            state.sent.push(action.payload);
            if(!action.payload.read)
          {  state.unreadSent+=1;}
        },
        removeMail(state,action){
            const {id,type}= action.payload;
            if(type === 'inbox'){
                
                const item = state.inbox.find( itm => itm.id === id);
                if(!item.read)
               { state.unreadInbox-=1;}
               state.inbox = state.inbox.filter(itm=> itm.id !== id );
            }
            else{
                
                const item = state.sent.find( itm => itm.id === id);
                if(!item.read)
               { state.unreadSent-=1;}
               state.sent = state.sent.filter(itm=> itm.id !== id );
            }
            
        },
        readMail(state,action)
        {
            const {id,type} = action.payload;
            if(type=== 'inbox')
            {
                const item = state.inbox.find( itm => itm.id === id);
                item.read = true;
                if(state.unreadInbox>=0)
               { state.unreadInbox-=1;
               }
            }else if(type === 'sent')
            {
               
                const item = state.sent.find( itm => itm.id === id);
                item.read = true;
                if(state.unreadSent>=0)
               { state.unreadSent-=1;
               } 
            }
             
            
        }
    }
})

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;