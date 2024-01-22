import {
  Image,
  Form,
  CloseButton,
  Stack,
  InputGroup,
  Button,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import {
  HandThumbsUp,
  Send,
  ChatLeftText,
  Person,
  Globe,
  People,
} from 'react-bootstrap-icons';

import TimeAgo from '../../utils/TimeAgo';

import { useEffect, useState } from 'react';

import { useCheckIfFriendQuery } from '../../states/slices/friends/apiFriendsEndpoints';
import LoadingData from '../loading/LoadingData';

const defMaleImg = 'http://localhost:5000/defaultImg/defaultMale.jpg';
const defFemaleImg = 'http://localhost:5000/defaultImg/defaultFemale.jpg';
const defImg = 'http://localhost:5000/defaultImg/Default.jpg';

const UserProfile = ({ viewedUserPosts, viewedUser, loggedInUser }) => {
  const viewed = viewedUser || '';
  const viewedPost = viewedUserPosts || [];
  const loggedInUserId = loggedInUser._id || [];

  console.log('Viewed:', viewed);

  const [friend, setFriend] = useState([]);

  const { data: isFriend } = useCheckIfFriendQuery({
    loggedInUserId,
    otherUserId: [viewed._id],
  });

  useEffect(() => {
    // Assuming isFriend has a property called isFriend which is an array
    setFriend(isFriend && isFriend.isFriend && isFriend.isFriend[0]);
  }, [isFriend]);

  console.log('userProfile DataL', friend);

  return (
    <section className='w-100'>
      {viewed ? (
        <>
          <h4 className='text-muted mb-3'>Other posts</h4>

          {viewedPost.map((post, index) => {
            const isOwnPost = loggedInUserId === post.uploadedUserID;

            const isFriendPost =
              post.postAudience === 'friends' && friend === true;

            const isPrivatePost = post.postAudience === 'private' && isOwnPost;

            const isPublicPost = post.postAudience === 'public';

            console.log('Options:', isFriendPost + [index] + ' ' + friend);
            console.log('UserProfle Post:', friend);

            return (
              (isFriendPost || isOwnPost || isPrivatePost || isPublicPost) && (
                <section
                  key={index}
                  className='bg-white mb-3 rounded shadow border'>
                  <div className='p-3'>
                    <div className='d-flex justify-content-between'>
                      <div className='d-flex align-items-center gap-3'>
                        <LinkContainer
                          to={`/userPage/${viewed._id}`}
                          className='btn btn-outline-secondary border-0 text-black'>
                          <>
                            <Image
                              src={`http://localhost:5000/${post.uploadedUserID}/profilePictures/${post.userProfile}`}
                              alt={
                                viewed.gender === 'Male'
                                  ? defMaleImg
                                  : viewed.gender === 'Female'
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
                              <small className='text-muted white me-2'>
                                <TimeAgo date={post.createdAt} />
                              </small>
                              <small className=' '>
                                {post.postAudience === 'private' ? (
                                  <>
                                    <Person />
                                    {post.postAudience}
                                  </>
                                ) : post.postAudience === 'friends' ? (
                                  <>
                                    <People /> {post.postAudience}
                                  </>
                                ) : (
                                  <>
                                    <Globe /> {post.postAudience}
                                  </>
                                )}
                              </small>
                            </div>
                          </>
                        </LinkContainer>
                      </div>
                      {post.uploadedUserID === viewed._id && (
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
              )
            );
          })}
        </>
      ) : (
        <LoadingData />
      )}
    </section>
  );
};

export default UserProfile;
