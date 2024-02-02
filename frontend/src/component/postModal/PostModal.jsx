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

  const resetInputData = () => {
    setInputData({ ...inputData, fePostDescription: '', fePostImages: [] });
  };

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
      resetInputData();
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
        keyboard={false}>
        <Modal.Header>
          <Modal.Title>
            <h4 className='text-center m-auto'>{`${userInfo.fname}, express something ?`}</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section>
            <Form
              id='postingForm'
              onSubmit={(e) => handleSubmit(e)}>
              <Form.Select
                aria-label='Default select example'
                className='border border-1'
                onChange={handlePostSortChange}
                value={inputData.fePostAudience}>
                <option value='public'>Public</option>
                <option value='friends'>Friends</option>
                <option value='private'>Private</option>
              </Form.Select>
              <Form.Control
                as='textarea'
                style={{ maxHeight: '100px' }}
                className='my-3 border border-0'
                placeholder={`Whats on your mind, ${userInfo.fname}`}
                value={inputData.fePostDescription}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    fePostDescription: e.target.value,
                  })
                }
              />
              <small className='d-block m-auto text-center w-100 mb-3'>
                Other actions
              </small>

              <Form.Label
                htmlFor='postFileInput'
                className='text-text border border-1 p-1 rounded m-auto'
                style={{ cursor: 'pointer' }}>
                {' '}
                <Images
                  size={25}
                  className='me-3 text-secondary'
                />
                Attach photo
              </Form.Label>
              <Form.Control
                type='file'
                accept='image/*, video/mp4'
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
            </Form>
          </section>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='outline-secondary'
            onClick={handleClose}>
            Close
          </Button>
          <Button
            form='postingForm'
            variant='primary'
            type='submit'
            disabled={
              inputData.fePostImages.length >= 1 || inputData.fePostDescription
                ? false
                : true
            }>
            {isLoading ? <LoadingSpinner /> : 'Post'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostModal;
