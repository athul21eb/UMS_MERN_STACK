import { Container, Card, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
const Hero = () => {
  return (
    <div >
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>MERN UMS APP</h1>
          <img src="./MERN.png" alt="MERN.Png" height='250px' width='678px'/>
          <div className='d-flex mt-5'>
            <LinkContainer to={'/login'}>
            <Button variant='primary'  className='me-3'>
              Sign In
            </Button>
            </LinkContainer>
            <LinkContainer to={'/register'} className='me-3'>
            <Button variant='secondary'>
              Register
            </Button>
            </LinkContainer>
            <LinkContainer to={'/admin'} >
            <Button variant='danger'>
              Admin
            </Button>
            </LinkContainer>

            
           
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;