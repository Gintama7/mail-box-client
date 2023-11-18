import React from 'react'
import { Container, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const SentMail = () => {
    const sentMail = useSelector(state => state.mail.sent);

  return (
    <Container>
        <ListGroup>
           { sentMail.map((item)=>(
                <ListGroup.Item key={item.id}>{item.from} {item.message}</ListGroup.Item>
            ))}
        </ListGroup>
    </Container>
  )
}

export default SentMail
