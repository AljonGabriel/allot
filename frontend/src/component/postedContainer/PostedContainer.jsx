import { useState, useEffect } from 'react';
import { Image, Form } from 'react-bootstrap';
import axios from 'axios';
import LoadingSpinner from './../loading/LoadingSpinner';
const PostedContainer = () => {
  const [posted, setPosted] = useState(null);

  useEffect(() => {
    const getPosted = async () => {
      try {
        const res = await axios.get('/api/uploads/view');
        setPosted(res.data.posted);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getPosted();
  }, []);

  return (
    <>
      {posted ? (
        <>
          {posted.map((post) => (
            <section
              key={post._id}
              className='bg-white mt-3'>
              <div className='p-3'>
                <h6>{post.uploadedBy}</h6>
                <p>{post.description}</p>
              </div>
              <div>
                {post.images.map((image, index) => (
                  <Image
                    key={index}
                    src={`http://localhost:5000/${post.uploadedUserID}/${post.postedDate}/${image}`}
                    style={{ width: '100%', backgroundRepeat: 'no-repeat' }}
                    alt={`Image ${index + 1}`}
                  />
                ))}
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
          ))}
        </>
      ) : (
        <>
          <section className='bg-white mt-3 w-100 h-100'>
            <LoadingSpinner />
          </section>
        </>
      )}
    </>
  );
};

export default PostedContainer;
