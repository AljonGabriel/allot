import { Form, Image, Button, Stack } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Images } from 'react-bootstrap-icons';

const PostSeciton = () => {
  const [inputData, setInputData] = useState({
    fePostDescription: '',
    fePostImages: null,
  });

  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <section>
        <section className='border border-1 w-100 mb-3 rounded-2 p-3'>
          <Form>
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
                name='post' // Ensure this matches the field name in the array function
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
          <section className='bg-white mt-3'>
            <div className='p-3'>
              <h6>User name here</h6>
              <p>Post Description here</p>
            </div>
            <div>
              <Image
                srcSet='https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                style={{ width: '100%' }}
              />
              <div className='p-3'>
                <Form>
                  <Form.Control
                    type='text'
                    placeholder='Write a public comment'
                  />
                </Form>
              </div>
            </div>
          </section>
          <section className='bg-white mt-3'>
            <div className='p-3'>
              <h6>User name here</h6>
              <p>Post Description here</p>
            </div>
            <div>
              <Image
                srcSet='https://images.unsplash.com/photo-1482440308425-276ad0f28b19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                style={{ width: '100%' }}
              />
            </div>
            <div className='p-3'>
              <Form>
                <Form.Control
                  type='text'
                  placeholder='Write a public comment'
                />
              </Form>
            </div>
          </section>
          <section className='bg-white mt-3'>
            <div className='p-3'>
              <h6>User name here</h6>
              <p>Post Description here</p>
            </div>
            <div>
              <Image
                srcSet='https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                style={{ width: '100%' }}
              />
            </div>
            <div className='p-3'>
              <Form>
                <Form.Control
                  type='text'
                  placeholder='Write a public comment'
                />
              </Form>
            </div>
          </section>
        </section>
      </section>
    </>
  );
};

export default PostSeciton;
