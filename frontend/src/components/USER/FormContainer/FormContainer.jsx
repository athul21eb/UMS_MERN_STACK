import React, { Children } from 'react'
import {Container,Row,Col} from 'react-bootstrap'
function FormContainer({children}) {
  return (
   <Container >
    <Row className=' justify-content-md-center'>
        <Col xs='12' md='6' className='Card  border-2 p-5'>
{children}
        </Col>
    </Row>
    
   </Container>
  )
}

export default FormContainer