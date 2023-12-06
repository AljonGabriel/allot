import { useState, useEffect } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
//Api Calls
import {
  useVerifyMutation,
  useCreateMutation,
} from '../../states/slices/users/usersApiSlice.js.js';

//Local Reducers
import { setCredentials } from '../../states/slices/users/authSlice.js';

import { useDispatch } from 'react-redux';
import LoadingSpinner from '../loading/LoadingSpinner.jsx';
import DatePicker from 'react-datepicker';

const Register = () => {
  const [inputData, setInputData] = useState({
    feFname: '',
    feMname: '',
    feLname: '',
    feGender: '',
    feBirthdate: null,

    feEmail: '',
    fePassword: '',
    feConfirmPwd: '',

    feVerificationCode: '',
  });
  //Modal State
  const [show, setShow] = useState(false);
  //Modal boolean
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [verify, { isLoading: isVerifyLoading }] = useVerifyMutation();
  const [create, { isLoading: isCreateLoading }] = useCreateMutation();

  const [errors, setErrors] = useState();
  const [codeSent, setCodeSent] = useState(false);
  const [timer, setTimer] = useState(0);

  const startTimer = () => {
    setTimer(900); // 15 minutes in seconds
  };

  const decrementTimer = () => {
    setTimer((prevTimer) => prevTimer - 1);
  };

  useEffect(() => {
    let timerId;

    if (timer > 0) {
      timerId = setInterval(decrementTimer, 1000);
    }

    return () => clearInterval(timerId);
  }, [timer]);

  //verify data then sendcode
  const handlesData = async (event) => {
    event.preventDefault();

    try {
      await verify(inputData).unwrap();
      setCodeSent(true);
      startTimer();
    } catch (err) {
      setErrors(err.data?.errors);
      console.log(err);
    }
  };

  const handlesCreatingUser = async (e) => {
    e.preventDefault();

    try {
      const res = await create(inputData).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/upload-profile-picture');
    } catch (err) {
      setErrors(err.data?.errors);
      console.log(err);
    }
  };

  return (
    <>
      <Button
        variant='secondary'
        size='lg'
        onClick={handleShow}
        className='m-auto my-3 d-block w-75'>
        Create an account
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Create an account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!codeSent ? (
            <Form
              id='handlesDataForm'
              onSubmit={(e) => handlesData(e)}>
              <>
                <section>
                  <p className='text-body-secondary'>User Information</p>

                  <Form.Group>
                    <InputGroup className='mb-3'>
                      <Form.Control
                        aria-label='First name'
                        placeholder='First name'
                        className={
                          errors && errors.feFname
                            ? 'is-invalid'
                            : !errors
                            ? ''
                            : 'is-valid'
                        }
                        value={inputData.feFname}
                        onChange={(e) =>
                          setInputData({
                            ...inputData,
                            feFname: e.target.value,
                          })
                        }
                      />

                      <Form.Control
                        aria-label='Middle name'
                        placeholder='Middle name'
                        className={
                          errors && errors.feMname
                            ? 'is-invalid'
                            : !errors
                            ? ''
                            : 'is-valid'
                        }
                        value={inputData.feMname}
                        onChange={(e) =>
                          setInputData({
                            ...inputData,
                            feMname: e.target.value,
                          })
                        }
                      />
                      <Form.Control
                        aria-label='Last name'
                        placeholder='Last name'
                        className={
                          errors && errors.feLname
                            ? 'is-invalid'
                            : !errors
                            ? ''
                            : 'is-valid'
                        }
                        value={inputData.feLname}
                        onChange={(e) =>
                          setInputData({
                            ...inputData,
                            feLname: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                    <div
                      role='alert'
                      aria-live='assertive'
                      aria-atomic='true'>
                      {errors && errors.fullName ? (
                        <p className='text-danger'>{errors.fullName}</p>
                      ) : !errors ? (
                        ''
                      ) : (
                        <p className='text-success'>Looks good</p>
                      )}
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <InputGroup className='mb-3'>
                      <Form.Select
                        aria-label='Default select example'
                        className={
                          errors && errors.feGender
                            ? 'is-invalid'
                            : !errors
                            ? ''
                            : 'is-valid'
                        }
                        value={inputData.feGender}
                        onChange={(e) =>
                          setInputData({
                            ...inputData,
                            feGender: e.target.value,
                          })
                        }>
                        <option
                          value=''
                          disabled>
                          Select Gender
                        </option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='BiSexual'>BiSexual</option>
                        <option value='rnts'>Rather not to say</option>
                      </Form.Select>
                    </InputGroup>
                    <div
                      role='alert'
                      aria-live='assertive'
                      aria-atomic='true'>
                      {errors && errors.feGender ? (
                        <p className='text-danger'>{errors.feGender}</p>
                      ) : !errors ? (
                        ''
                      ) : (
                        <p className='text-success'>Looks good</p>
                      )}
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <InputGroup
                      className='mb-3'
                      style={{ zIndex: '5' }}>
                      <DatePicker
                        showIcon
                        className={`form-control ${
                          errors && errors.feBirthdate
                            ? 'is-invalid'
                            : !errors
                            ? ''
                            : 'is-valid'
                        }`}
                        dateFormat='dd/MM/yyyy'
                        popperModifiers={{
                          preventOverflow: {
                            enabled: true,
                            escapeWithReference: false,
                            boundariesElement: 'viewport',
                          },
                        }}
                        placeholderText='Select Birth Date'
                        isClearable
                        showYearDropdown
                        yearDropdownItemNumber={50}
                        scrollableYearDropdown
                        selected={inputData.feBirthdate}
                        onChange={(e) =>
                          setInputData({ ...inputData, feBirthdate: e })
                        }
                      />
                    </InputGroup>
                    <div
                      role='alert'
                      aria-live='assertive'
                      aria-atomic='true'>
                      {errors && errors.feBirthdate ? (
                        <p className='text-danger'>{errors.feBirthdate}</p>
                      ) : !errors ? (
                        ''
                      ) : (
                        <p className='text-success'>Looks good</p>
                      )}
                    </div>
                  </Form.Group>
                </section>

                <section>
                  <p className='text-body-secondary'>Account Information</p>

                  <Form.Group>
                    <InputGroup className='mb-3'>
                      <Form.Control
                        type='email'
                        placeholder='E-mail'
                        className={
                          errors && errors.feEmail
                            ? 'is-invalid'
                            : !errors
                            ? ''
                            : 'is-valid'
                        }
                        value={inputData.feEmail}
                        onChange={(e) =>
                          setInputData({
                            ...inputData,
                            feEmail: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                    <div
                      role='alert'
                      aria-live='assertive'
                      aria-atomic='true'>
                      {errors && errors.feEmail ? (
                        <p className='text-danger'>{errors.feEmail}</p>
                      ) : !errors ? (
                        ''
                      ) : (
                        <p className='text-success'>Looks good</p>
                      )}
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <InputGroup className='mb-3'>
                      <Form.Control
                        type='password'
                        placeholder='Password'
                        className={
                          errors && errors.fePassword
                            ? 'is-invalid'
                            : !errors
                            ? ''
                            : 'is-valid'
                        }
                        value={inputData.fePassword}
                        onChange={(e) =>
                          setInputData({
                            ...inputData,
                            fePassword: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                    <div
                      role='alert'
                      aria-live='assertive'
                      aria-atomic='true'>
                      {errors && errors.fePassword ? (
                        <p className='text-danger'>{errors.fePassword}</p>
                      ) : !errors ? (
                        ''
                      ) : (
                        <p className='text-success'>Looks good</p>
                      )}
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <InputGroup className='mb-3'>
                      <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        className={
                          errors && errors.feConfirmPwd
                            ? 'is-invalid'
                            : !errors
                            ? ''
                            : 'is-valid'
                        }
                        value={inputData.feConfirmPwd}
                        onChange={(e) =>
                          setInputData({
                            ...inputData,
                            feConfirmPwd: e.target.value,
                          })
                        }
                      />
                    </InputGroup>
                    <div
                      role='alert'
                      aria-live='assertive'
                      aria-atomic='true'>
                      {errors && errors.feConfirmPwd ? (
                        <p className='text-danger'>{errors.feConfirmPwd}</p>
                      ) : !errors ? (
                        ''
                      ) : (
                        <p className='text-success'>Looks good</p>
                      )}
                    </div>
                  </Form.Group>
                </section>
              </>
            </Form>
          ) : (
            <>
              <Form
                id='handlesCreatingUserForm'
                onSubmit={(e) => handlesCreatingUser(e)}>
                <Form.Group className='mb-3'>
                  <Form.Label>
                    Verification Code:{' '}
                    <b className='text-success'> {inputData.feEmail}</b>
                  </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='ex.rLPOCE'
                    className={
                      errors && errors.feVerificationCode
                        ? 'is-invalid'
                        : !errors?.feVerificationCode
                        ? ''
                        : 'is-valid'
                    }
                    value={inputData.feVerificationCode}
                    onChange={(e) =>
                      setInputData({
                        ...inputData,
                        feVerificationCode: e.target.value,
                      })
                    }
                  />
                  <small className='text-muted d-block'>
                    The code was sent to your email
                  </small>

                  <div
                    role='alert'
                    aria-live='assertive'
                    aria-atomic='true'>
                    {errors && errors.feVerificationCode && (
                      <p className='text-danger'>{errors.feVerificationCode}</p>
                    )}
                  </div>
                </Form.Group>
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!codeSent ? (
            <Button
              form='handlesDataForm'
              variant='primary'
              type='submit'
              disabled={isVerifyLoading} // Disable the button when loading
            >
              {isVerifyLoading ? <LoadingSpinner /> : 'Next'}
            </Button>
          ) : (
            <>
              <Button
                variant='outline-secondary'
                type='button'
                onClick={startTimer}
                disabled={timer}>
                {timer > 0 ? (
                  <>
                    Re-send in: {Math.floor(timer / 60)}:{timer % 60}
                  </>
                ) : (
                  'Re-send code'
                )}
              </Button>
              <Button
                variant='secondary'
                type='button'
                onClick={() => setCodeSent(false)}>
                Change e-mail
              </Button>
              <Button
                form='handlesCreatingUserForm'
                variant='primary'
                type='submit'
                disabled={isCreateLoading}>
                {isCreateLoading ? <LoadingSpinner /> : 'Verify Code'}
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Register;
