import { Form, Button, Stack } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Images } from 'react-bootstrap-icons';
import axios from 'axios';
import PostedContainer from '../postedContainer/PostedContainer';

const PostSeciton = () => {
  const [inputData, setInputData] = useState({
    fePostDescription: '',
    fePostImages: [],
  });

  const { userInfo } = useSelector((state) => state.auth);

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
      const res = await axios.post('/api/uploads/', formData);

      console.log(formData);

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(inputData.fePostImages);

  return (
    <>
      <section>
        <section className='border border-1 w-100 mb-3 rounded-2 p-3'>
          <Form onSubmit={(e) => handleSubmit(e)}>
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
                  setInputData({ ...inputData, fePostImages: selectedFiles });
                }}
              />
            </Stack>

            <Button
              variant='primary'
              size='lg'
              className='mt-3 w-100'
              type='submit'
              disabled={
                inputData.fePostDescription && inputData.fePostImages
                  ? false
                  : true
              }>
              Post
            </Button>
          </Form>
        </section>
        <section className='bg-white-secondary w-100 rounded-2 p-3'>
          <PostedContainer />
        </section>
      </section>
    </>
  );
};

export default PostSeciton;
