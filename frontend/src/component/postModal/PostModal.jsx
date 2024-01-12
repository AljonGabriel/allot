import LoadingSpinner from '../loading/LoadingSpinner';
import { Form, Button, Stack, Modal } from 'react-bootstrap';
import { GlobeAmericas, Images } from 'react-bootstrap-icons';

import { useDispatch } from 'react-redux';
import { setPosts } from '../../states/slices/uploads/postSlice';

import { useSelector } from 'react-redux';
import { useState } from 'react';

import { useCreateMutation } from '../../states/slices/uploads/apiUploadsEndpoints';

const PostModal = () => {
  const [inputData, setInputData] = useState({
    fePostDescription: '',
    fePostImages: [],
    fePostAudience: 'public',
  });

  const { userInfo } = useSelector((state) => state.auth);

  const [post, { isLoading }] = useCreateMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    // Append each file to the FormData
    for (let i = 0; i < inputData.fePostImages.length; i++) {
      formData.append('postImages', inputData.fePostImages[i]);
    }

    // Append the description to the FormData
    formData.append('fePostDescription', inputData.fePostDescription);

    // Append the description to the FormData
    formData.append('fePostAudience', inputData.fePostAudience);

    try {
      const data = await post(formData).unwrap();

      dispatch(setPosts({ ...data.uploaded.images }));

      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  //Handles data
  const handlePostSortChange = (event) => {
    event.preventDefault();
    console.log('clicked');

    setInputData({
      ...inputData,
      fePostAudience: event.target.value,
    });
  };

  console.log(inputData);

  return (
    <>
      <div className='p-3  bg-white rounded  shadow-sm border mb-3'>
        <Form.Group className='d-flex'>
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
              <Form.Select
                aria-label='Default select example'
                className='mb-3 border border-0'
                onChange={handlePostSortChange}
                value={inputData.fePostAudience}>
                <option value='public'>Public</option>
                <option value='friends'>Friends</option>
                <option value='private'>Private</option>
              </Form.Select>

              <Form.Control
                as='textarea'
                style={{ maxHeight: '100px' }}
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
            disabled={!inputData.fePostDescription ? true : isLoading && true}>
            {isLoading ? <LoadingSpinner /> : 'Post'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostModal;
