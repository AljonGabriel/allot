import { useState, useEffect } from 'react';
import { Image, Form, CloseButton } from 'react-bootstrap';
import { useGetUploadsQuery } from '../../states/slices/uploads/apiUploadsEndpoints';
import LoadingSpinner from './../loading/LoadingSpinner';
import { useSelector } from 'react-redux';
import TimeAgo from '../../utils/TimeAgo';

const defMaleImg = 'http://localhost:5000/defaultImg/defaultMale.jpg';
const defFemaleImg = 'http://localhost:5000/defaultImg/defaultFemale.jpg';
const defImg = 'http://localhost:5000/defaultImg/Default.jpg';

const PostedContainer = () => {
  const [posted, setPosted] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const { postedData } = useSelector((state) => state.posts);

  const { data, isLoading, isError, refetch } = useGetUploadsQuery();

  const getPosted = async () => {
    try {
      setPosted(data?.posted || []);
    } catch (error) {
      console.error('Error fetching posts:', isError);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await refetch();
      console.log('Data from backend:', result.data);
      getPosted();
    };
    fetchData();
  }, [postedData, data]);

  return (
    <>
      {posted ? (
        <>
          {posted.map((post) => (
            <section
              key={post._id}
              className='bg-white mt-3 rounded shadow border'>
              <div className='p-3'>
                <div className='d-flex justify-content-between'>
                  <div className='d-flex align-items-center gap-3'>
                    <Image
                      src={`http://localhost:5000/${post.uploadedUserID}/profilePictures/${post.userProfile}`}
                      alt={
                        userInfo.gender === 'Male'
                          ? defMaleImg
                          : userInfo.gender === 'Female'
                          ? defFemaleImg
                          : defImg
                      }
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                      }}
                      roundedCircle
                      className='m-auto'
                    />
                    <div>
                      <h4 className='d-block m-0 text-text'>
                        {post.uploadedBy}
                      </h4>
                      <small className='d-block text-muted white'>
                        <TimeAgo date={post.createdAt} />
                      </small>
                    </div>
                  </div>
                  {post.uploadedUserID === userInfo._id && (
                    <div>
                      <CloseButton />
                    </div>
                  )}
                </div>

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
