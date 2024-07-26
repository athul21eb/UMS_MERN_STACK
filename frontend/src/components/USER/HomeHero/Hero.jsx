import { Container, Card, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
const Hero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>MERN UMS APP</h1>
          <p className='text-center mb-4'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima mollitia qui impedit illum sint delectus consequuntur ullam tenetur corrupti natus exercitationem quaerat consequatur sequi officiis esse veritatis voluptate vero cum necessitatibus, quidem quo labore inventore. Eius veritatis quam ad reiciendis! Veritatis impedit quaerat consequuntur doloribus magnam autem voluptatum voluptas animi.
          </p>
          <div className='d-flex'>
            <LinkContainer to={'/login'}>
            <Button variant='primary'  className='me-3'>
              Sign In
            </Button>
            </LinkContainer>
            <LinkContainer to={'/register'}>
            <Button variant='secondary'>
              Register
            </Button>
            </LinkContainer>

            
           
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;