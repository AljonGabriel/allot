import { useState, useEffect } from 'react';
import { Image, Form } from 'react-bootstrap';
import { useGetUploadsQuery } from '../../states/slices/uploads/apiUploadsEndpoints';
import LoadingSpinner from './../loading/LoadingSpinner';
import { useSelector } from 'react-redux';

const defMaleImg = 'http://localhost:5000/defaultImg/defaultMale.jpg';
const defFemaleImg = 'http://localhost:5000/defaultImg/defaultFemale.jpg';
const defImg = 'http://localhost:5000/defaultImg/Default.jpg';

const PostedContainer = () => {
  const [posted, setPosted] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const { postedData } = useSelector((state) => state.posts);

  console.log(postedData);

  const { data, isLoading, isError } = useGetUploadsQuery();

  const getPosted = async () => {
    try {
      setPosted(data?.posted || []);
    } catch (error) {
      console.error('Error fetching posts:', isError);
    }
  };

  useEffect(() => {
    getPosted();
  }, [postedData]);

  return (
    <>
      {posted ? (
        <>
          {posted.map((post) => (
            <section
              key={post._id}
              className='bg-white mt-3 rounded shadow border'>
              <div className='p-3'>
                <Image
                  src={`http://localhost:5000/${post.uploadedUserID}/profilePictures/${post.userProfile}`}
                  alt={
                    userInfo.gender === 'Male'
                      ? defMaleImg
                      : userInfo.gender === 'Female'
                      ? defFemaleImg
                      : defImg
                  }
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  roundedCircle
                  className='m-auto'
                />
                <h6 className='d-inline ms-3'>{post.uploadedBy}</h6>

                {post.images.length <= 0 ? (
                  <h2 className='m-auto text-text'>{post.description}</h2>
                ) : post.images[0].includes('PF_') ? (
                  <>
                    <p className='text-accent m-auto d-flex align-items-center py-3'>
                      New profile picture
                    </p>
                  </>
                ) : (
                  <p className='text-text m-auto d-flex align-items-center'>
                    {post.description}
                  </p>
                )}
              </div>

              <div>
                {post.images.length === 1 ? (
                  <>
                    {post.images.map((image, index) =>
                      image.includes('PF_') ? (
                        <Image
                          key={index}
                          src={`http://localhost:5000/${post.uploadedUserID}/profilePictures/${image}`}
                          style={{
                            width: '100%',
                            backgroundRepeat: 'no-repeat',
                            objectFit: 'cover',
                          }}
                          alt={`Image ${index + 1}`}
                        />
                      ) : (
                        <Image
                          key={index}
                          src={`http://localhost:5000/${post.uploadedUserID}/post/${post.postedDate}/${image}`}
                          style={{
                            width: '100%',
                            backgroundRepeat: 'no-repeat',
                            objectFit: 'cover',
                          }}
                          alt={`Image ${index + 1}`}
                        />
                      ),
                    )}
                  </>
                ) : post.images.length === 2 ? (
                  <>
                    {post.images.map((image, index) => (
                      <Image
                        key={index}
                        src={`http://localhost:5000/${post.uploadedUserID}/post/${post.postedDate}/${image}`}
                        style={{
                          width: '100%', // Adjust the width as needed
                          backgroundRepeat: 'no-repeat',
                          objectFit: 'cover',
                        }}
                        className=''
                        alt={`Image ${index + 1}`}
                      />
                    ))}
                  </>
                ) : post.images.length === 3 ? (
                  <>
                    {post.images.map(
                      (image, index) => (
                        console.log('Images:', [image]),
                        (
                          <Image
                            key={index}
                            src={`http://localhost:5000/${post.uploadedUserID}/post/${post.postedDate}/${image}`}
                            style={{
                              width: index === 0 ? '100%' : '50%', // Set width to 100% for the first image, else 50%
                              backgroundRepeat: 'no-repeat',
                              objectFit: 'cover',
                            }}
                            className=''
                            alt={`Image ${index + 1}`}
                          />
                        )
                      ),
                    )}
                  </>
                ) : (
                  <>
                    {post.images.map((image, index) => (
                      <Image
                        key={index}
                        src={`http://localhost:5000/${post.uploadedUserID}/post/${post.postedDate}/${image}`}
                        style={{
                          width: '50%',
                          backgroundRepeat: 'no-repeat',
                          objectFit: 'cover',
                        }}
                        alt={`Image ${index + 1}`}
                      />
                    ))}
                  </>
                )}
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
      ) : isLoading ? (
        <>
          <section className='bg-white m-auto p-3 text-center'>
            <LoadingSpinner />
            Loading ....
          </section>
        </>
      ) : (
        <>
          <h2>No post yet</h2>
        </>
      )}
    </>
  );
};

export default PostedContainer;
