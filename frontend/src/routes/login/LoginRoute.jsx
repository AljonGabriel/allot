import Login from '../../component/login/Login';
import { Container } from 'react-bootstrap';

const LoginRoute = () => {
  return (
    <>
      <Container
        fluid
        className='bg-light'
        style={{ height: '500px' }}>
        <Container className='d-flex align-items-center justify-content-center h-100'>
          <section>
            <h3 className='text-accent text-center my-3'>allot</h3>
            <Login />
          </section>
        </Container>
      </Container>
    </>
  );
};

export default LoginRoute;
