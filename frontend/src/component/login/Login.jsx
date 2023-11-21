import { Button, Form } from 'react-bootstrap';

import Register from '../register/Register';

const login = () => {
  return (
    <>
      <Form
        id='LoginForm'
        className='shadow p-3 rounded-3 bg-light m-auto'
        style={{ width: '400px' }}>
        <Form.Group
          className='mb-3'
          controlId='LoginForm.email'>
          <Form.Control
            size='lg'
            type='email'
            placeholder='name@example.com'
          />
        </Form.Group>
        <Form.Group
          className='mb-3'
          controlId='LoginForm.password'>
          <Form.Control
            size='lg'
            type='password'
            placeholder='Password'
          />
        </Form.Group>
        <Button
          variant='primary'
          size='lg'
          className='w-100'>
          Log In
        </Button>
        <a
          href=''
          className='text-center text-text d-block my-4'
          style={{ textDecoration: 'none' }}>
          Forgot password?
        </a>
        <hr />
        <Register />
      </Form>
    </>
  );
};

export default login;
