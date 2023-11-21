import { useState } from 'react';
import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

const Register = () => {
  const [inputData, setInputData] = useState({
    fefname: '',
    femname: '',
    felname: '',
    fegender: '',
    febirthdate: null,

    feemail: '',
    fepassword: '',
    feconfirmPwd: '',
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault;
    console.log('Clicked and preventing');
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
          <Form
            id='registerForm'
            onClick={(e) => handleSubmit(e)}>
            <section>
              <p className='text-body-secondary'>User Information</p>
              <InputGroup className='mb-3'>
                <Form.Control
                  aria-label='First name'
                  placeholder='First name'
                  value={inputData.fefname}
                  onChange={(e) =>
                    setInputData({ ...inputData, fefname: e.target.value })
                  }
                />
                <Form.Control
                  aria-label='Middle name'
                  placeholder='Middle name'
                  value={inputData.femname}
                  onChange={(e) =>
                    setInputData({ ...inputData, femname: e.target.value })
                  }
                  on
                />
                <Form.Control
                  aria-label='Last name'
                  placeholder='Last name'
                  value={inputData.felname}
                  onChange={(e) =>
                    setInputData({ ...inputData, felname: e.target.value })
                  }
                />
              </InputGroup>

              <InputGroup className='mb-3'>
                <Form.Select
                  aria-label='Default select example'
                  value={inputData.fegender}
                  onChange={(e) =>
                    setInputData({ ...inputData, fegender: e.target.value })
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

              <InputGroup className='mb-3'>
                <DatePicker
                  showIcon
                  className='form-control '
                  dateFormat='dd/MM/yyyy'
                  placeholderText='Select Birth Date'
                  isClearable
                  showYearDropdown
                  yearDropdownItemNumber={50}
                  scrollableYearDropdown
                  selected={inputData.febirthdate}
                  onChange={(e) =>
                    setInputData({ ...inputData, febirthdate: e })
                  }
                />
              </InputGroup>
            </section>

            <section>
              <p className='text-body-secondary'>Account Information</p>

              <InputGroup className='mb-3'>
                <Form.Control
                  type='email'
                  placeholder='E-mail'
                  value={inputData.feemail}
                  onChange={(e) =>
                    setInputData({ ...inputData, feemail: e.target.value })
                  }
                />
              </InputGroup>

              <InputGroup className='mb-3'>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={inputData.fepassword}
                  onChange={(e) =>
                    setInputData({ ...inputData, fepassword: e.target.value })
                  }
                />
              </InputGroup>

              <InputGroup className='mb-3'>
                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  value={inputData.feconfirmPwd}
                  onChange={(e) =>
                    setInputData({ ...inputData, feconfirmPwd: e.target.value })
                  }
                />
              </InputGroup>
            </section>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={handleClose}>
            Close
          </Button>
          <Button
            form='registerForm'
            variant='primary'>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Register;
