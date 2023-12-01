import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../states/slices/users/usersApiSlice.js';
import { setCredentials } from './../../states/slices/users/authSlice.js';
import Register from '../register/Register';
import LoadingSpinner from '../loading/LoadingSpinner.jsx';

const Login = () => {
  const [inputData, setInputData] = useState({
    feEmail: '',
    fePassword: '',
  });

  //Erros stores here
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  useEffect(() => {
    if (userInfo) {
      navigate('/home');
    } else {
      navigate('/');
    }
  }, [navigate, userInfo, dispatch]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(inputData).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/home');
    } catch (err) {
      console.log(err.data?.message);
      const error = err.data?.message;
      setErrors(error);
    }
  };

  return (
    <>
      <section
        className='shadow p-3 rounded-3 bg-light m-auto'
        style={{ width: '400px' }}>
        {errors ? (
          <p className='my-3 text-center d-block text-danger'>{errors}</p>
        ) : (
          ''
        )}
        <Form
          id='loginForm'
          onSubmit={(e) => handleLoginSubmit(e)}>
          <Form.Group
            className='mb-3'
            controlId='LoginForm.email'>
            <Form.Control
              size='lg'
              type='email'
              value={inputData.feEmail}
              className={errors ? 'is-invalid' : !errors ? '' : 'is-valid'}
              onChange={(e) =>
                setInputData({ ...inputData, feEmail: e.target.value })
              }
              placeholder='name@example.com'
            />
          </Form.Group>
          <Form.Group
            className='mb-3'
            controlId='LoginForm.password'>
            <Form.Control
              size='lg'
              type='password'
              className={errors ? 'is-invalid' : !errors ? '' : 'is-valid'}
              value={inputData.fePassword}
              onChange={(e) =>
                setInputData({ ...inputData, fePassword: e.target.value })
              }
              placeholder='Password'
            />
          </Form.Group>

          <Button
            variant='primary'
            size='lg'
            className='w-100'
            form='loginForm'
            type='submit'
            disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : ' Log In'}
          </Button>
          <a
            href=''
            className='text-center text-text d-block my-4'
            style={{ textDecoration: 'none' }}>
            Forgot password?
          </a>
        </Form>
        <hr />
        <Register />
      </section>
    </>
  );
};

export default Login;
