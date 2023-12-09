import { Form, Button, Stack, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Images } from 'react-bootstrap-icons';
import { useCreateMutation } from '../../states/slices/uploads/apiUploadsEndpoints';
import PostedContainer from '../postedContainer/PostedContainer';
import { UserProfileImage } from '../userProfileImage/userProfileImage';
import LoadingSpinner from '../loading/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const PostSeciton = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    fePostDescription: '',
    fePostImages: [],
  });

  const { userInfo } = useSelector((state) => state.auth);

  const [post, { isLoading }] = useCreateMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    // Append each file to the FormData
    for (let i = 0; i < inputData.fePostImages.length; i++) {
      formData.append('postImages', inputData.fePostImages[i]);
    }

    // Append the description to the FormData
    formData.append('fePostDescription', inputData.fePostDescription);

    try {
      await post(formData).unwrap();
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  console.log(inputData.fePostImages);

  return (
    <>
      <section className='m-auto w-50 '>
        <div className='p-3  bg-white rounded  shadow-sm'>
          <Form.Group className='d-flex'>
            <UserProfileImage />
            <Form.Control
              className='border border-0 bg-white-secondary'
              onClick={handleShow}
              placeholder={`What's on your mind, ${userInfo.fname}`}
            />
          </Form.Group>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop='static'
          keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Share something ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <section className='border border-1  mb-3 rounded-2 p-3'>
              <Form
                id='postingForm'
                onSubmit={(e) => handleSubmit(e)}>
                <Form.Control
                  as='textarea'
                  className='mb-3 border border-0 bg-transparent'
                  placeholder={`Whats on your mind, ${userInfo.fname}`}
                  value={inputData.fePostDescription}
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      fePostDescription: e.target.value,
                    })
                  }
                />

                <Stack
                  gap={1}
                  className='p-3 d-flex align-items-center justify-content-center rounded border bg-white'>
                  <Form.Label htmlFor='postFileInput'>
                    {' '}
                    <Images
                      size={50}
                      className='d-block text-center m-auto text-secondary'
                    />
                    Add photos/Videos
                  </Form.Label>
                  <Form.Control
                    type='file'
                    accept='image/*'
                    id='postFileInput'
                    name='postImages' // Ensure this matches the field name in the array function
                    className='d-none'
                    multiple
                    onChange={(e) => {
                      const selectedFiles = e.target.files;
                      setInputData({
                        ...inputData,
                        fePostImages: selectedFiles,
                      });
                    }}
                  />
                </Stack>
              </Form>
            </section>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={handleClose}>
              Close
            </Button>
            <Button
              form='postingForm'
              variant='primary'
              type='submit'
              disabled={
                !inputData.fePostDescription ? true : isLoading && true
              }>
              {isLoading ? <LoadingSpinner /> : 'Post'}
            </Button>
          </Modal.Footer>
        </Modal>

        <PostedContainer />
      </section>
    </>
  );
};

export default PostSeciton;
