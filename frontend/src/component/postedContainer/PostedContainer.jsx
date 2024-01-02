import { useState, useEffect } from 'react';
import {
  Image,
  Form,
  CloseButton,
  InputGroup,
  Button,
  Stack,
} from 'react-bootstrap';
import { useGetUploadsQuery } from '../../states/slices/uploads/apiUploadsEndpoints';
import LoadingSpinner from './../loading/LoadingSpinner';
import { useSelector } from 'react-redux';
import TimeAgo from '../../utils/TimeAgo';
import { LinkContainer } from 'react-router-bootstrap';
import { HandThumbsUp, Send, ChatLeftText } from 'react-bootstrap-icons';

const defMaleImg = 'http://localhost:5000/defaultImg/defaultMale.jpg';
const defFemaleImg = 'http://localhost:5000/defaultImg/defaultFemale.jpg';
const defImg = 'http://localhost:5000/defaultImg/Default.jpg';

const PostedContainer = () => {
  const [posted, setPosted] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const { postedData } = useSelector((state) => state.posts);

  const { data, isLoading, refetch } = useGetUploadsQuery();

  const getPosted = async () => {
    try {
      setPosted(data?.posted || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await refetch();
      getPosted();
    };
    fetchData();
  }, [postedData, data]);

  return (
    <>
      {posted ? (
        <>
          {posted.map((post, index) => (
            <section
              key={index}
              className='bg-white mt-3 rounded shadow border'>
              <div className='p-3'>
                <div className='d-flex justify-content-between'>
                  <LinkContainer to={`/userPage/${post.uploadedUserID}`}>
                    <div className='d-flex align-items-center gap-3'>
                      <>
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
                            cursor: 'pointer',
                          }}
                          roundedCircle
                          className='m-auto '
                        />

                        <div>
                          <h4 className='d-block m-0 text-text'>
                            {post.uploadedBy}
                          </h4>
                          <small className='d-block text-muted white'>
                            <TimeAgo date={post.createdAt} />
                          </small>
                        </div>
                      </>
                    </div>
                  </LinkContainer>
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
                      {post.description === ''
                        ? 'Updated my profile picture'
                        : post.description}
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
                    {post.images.map((image, index) => (
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
                    ))}
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
                  <Stack direction='horizontal'>
                    <div>
                      <HandThumbsUp
                        color='gray'
                        className='m-3 bg-white'
                        size={30}
                      />
                      <small>Like</small>
                    </div>
                    <div>
                      <ChatLeftText
                        color='gray'
                        className='m-3 bg-white'
                        size={30}
                      />
                      <label>Comment</label>
                    </div>
                  </Stack>
                  <Form>
                    <InputGroup>
                      <Form.Control
                        type='text'
                        placeholder='Write a public comment'
                      />
                      <Button size='lg'>
                        <Send />
                      </Button>
                    </InputGroup>
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
