import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, ListGroup } from 'react-bootstrap';

const Inbox = () => {
    const [inboxMail,setInboxMail] = useState([]);
    const loggedMail = localStorage.getItem('email');
    let mail = '';
    for(let i=0;i<loggedMail.length;i++)
    {
        if(loggedMail[i]!== '@' && loggedMail[i]!=='.')
        {
            mail+= loggedMail[i];
        }
    }
    useEffect(()=>{
       
        axios.get(`https://mail-box-client-39877-default-rtdb.firebaseio.com/emails/${mail}/incoming.json`)
        .then((res)=>{
            const data =res.data;
            for(const key in data){
                if (data.hasOwnProperty(key)) {
                  setInboxMail(prev=>[...prev,data[key]]);
                  console.log(data[key]);
                }
              }
            
            // console.log(res.data);
        })
        
    },[])
  return (
    <Container>
        <ListGroup>
           { inboxMail.map((item)=>(
                <ListGroup.Item key={item.id}>{item.from} {item.message}</ListGroup.Item>
            ))}
        </ListGroup>
    </Container>
  )
}

export default Inbox
