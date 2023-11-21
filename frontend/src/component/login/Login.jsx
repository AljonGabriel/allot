import { Button, Form } from 'react-bootstrap';

const login = () => {
  return (
    <>
      <Form
        id='LoginForm'
        className='shadow p-3 rounded-3'
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
          className='w-100 text-white'>
          Log In
        </Button>
        <a
          href=''
          className='text-center d-block my-2'>
          Forgot password?
        </a>
        <hr />
        <Button
          variant='secondary'
          size='lg'
          className='d-block m-auto my-3'>
          Create new account
        </Button>
      </Form>
    </>
  );
};

export default login;
