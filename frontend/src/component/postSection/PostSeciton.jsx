import { Form, Image, Button } from 'react-bootstrap';
const PostSeciton = () => {
  return (
    <>
      <section>
        <section className='bg-white-secondary w-100 mb-3 rounded-2 p-3'>
          <Form>
            <Form.Control
              type='text'
              placeholder="What's on your mind, User"
            />
            <Button className='mt-3'>Post</Button>
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
