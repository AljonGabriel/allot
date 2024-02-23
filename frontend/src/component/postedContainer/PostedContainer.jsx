import { useState, useEffect } from 'react';
import { Image, CloseButton } from 'react-bootstrap';

import { useGetUploadsQuery } from '../../states/slices/uploads/apiUploadsEndpoints';
import { useCheckIfFriendQuery } from '../../states/slices/friends/apiFriendsEndpoints';
import { useDeleteOwnPostMutation } from '../../states/slices/uploads/apiUploadsEndpoints';

import { setPosts } from '../../states/slices/uploads/postSlice';

import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import TimeAgo from '../../utils/TimeAgo';
import { LinkContainer } from 'react-router-bootstrap';
import { ChatLeftText, Globe, People, Person } from 'react-bootstrap-icons';
import LoadingData from '../loading/LoadingData';
import CommentField from '../comment/CommentField';
import Comments from '../comment/Comments';
import LoadingSpinner from '../loading/LoadingSpinner';

const defMaleImg = 'http://localhost:5000/defaultImg/defaultMale.jpg';
const defFemaleImg = 'http://localhost:5000/defaultImg/defaultFemale.jpg';
const defImg = 'http://localhost:5000/defaultImg/Default.jpg';

const PostedContainer = () => {
  const dispatch = useDispatch();
  //useStates

  const [posted, setPosted] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);
  const { postedData } = useSelector((state) => state.posts);

  const [showField, setShowField] = useState(Array(posted.length).fill(false));
  const [showModalField, setShowModalField] = useState(
    Array(posted.length).fill(false),
  );

  const toggleCommentField = (index) => {
    const updatedShowFields = [...showField];
    updatedShowFields[index] = !updatedShowFields[index];
    setShowField(updatedShowFields);
  };

  const toggleModalCommentField = (index) => {
    const updatedShowModalFields = [...showField];
    updatedShowModalFields[index] = !updatedShowModalFields[index];
    setShowModalField(updatedShowModalFields);
  };

  const loggedUserId = userInfo._id;

  const { data, isLoading: isLoadingUploads, refetch } = useGetUploadsQuery();
  const { data: friend } = useCheckIfFriendQuery({
    loggedInUserId: loggedUserId,
    otherUserId: data?.posted.map((post) => post.uploadedUserID) || [], // Ensure data.posted is available before mapping
  });

  useEffect(() => {
    setPosted(data ? data.posted : []);

    const fetchData = async () => {
      await refetch();
    };

    fetchData();
  }, [friend, refetch, postedData, data]);

  const [deletePost, { isLoading: isLoadingDeletePost }] =
    useDeleteOwnPostMutation();

  const handleDeleteOwnPostClick = async (e, postId) => {
    e.preventDefault();

    // Display a confirmation dialog
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this post?',
    );

    // Check if the user confirmed the deletion
    if (shouldDelete) {
      try {
        // Proceed with post deletion
        const deletedPost = await deletePost({ postId }).unwrap();
        dispatch(setPosts({ deletedPost }));
        await refetch();
      } catch (err) {
        console.log('handleDeleteOwnPostClick err', err);
      }
    }
  };

  return (
    <>
      {!isLoadingUploads ? (
        posted && posted.length > 0 ? (
          posted.map((post, index) => {
            const areFriend =
              post.postAudience === 'friends' &&
              friend &&
              friend.isFriend[index] === true;
            const isOwnPost = loggedUserId === post.uploadedUserID;

            const isPrivatePost = post.postAudience === 'private' && isOwnPost;

            const isPublicPost = post.postAudience === 'public';

            return (
              areFriend ||
              isOwnPost ||
              isPrivatePost ||
              (isPublicPost && (
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
                            />

                            <div>
                              <h3 className='text-text m-auto'>
                                {post.uploadedBy}
                              </h3>
                              <small className='text-muted white me-2'>
                                <TimeAgo date={post.createdAt} />
                              </small>
                              <small>
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
                        </div>
                      </LinkContainer>
                      {post.uploadedUserID === userInfo._id && (
                        <>
                          {isLoadingDeletePost ? (
                            <LoadingSpinner />
                          ) : (
                            <CloseButton
                              onClick={(e) =>
                                handleDeleteOwnPostClick(e, post._id)
                              }
                            />
                          )}
                        </>
                      )}
                    </div>

                    {post.images.length <= 0 ? (
                      <h3 className='mt-3 text-text'>{post.description}</h3>
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

                    <div
                      onClick={() => toggleCommentField(index)}
                      style={{ cursor: 'pointer' }}
                      className='m-3'>
                      <ChatLeftText
                        color='gray'
                        size={25}
                      />
                      <label className='ms-2'>Write comment</label>
                    </div>

                    <div>
                      <Comments
                        post={post}
                        userInfo={userInfo}
                        toggleModalCommentField={() =>
                          toggleModalCommentField(index)
                        }
                        showModalField={showModalField}
                      />
                    </div>
                    {showField[index] && (
                      <div>
                        <CommentField
                          post={post}
                          userInfo={userInfo}
                        />
                      </div>
                    )}
                  </div>
                </section>
              ))
            );
          })
        ) : (
          <>
            <section className='p-3 bg-white shadow-sm rounded text-center'>
              <p>No posts yet. Why not start by sharing something?</p>
            </section>
          </>
        )
      ) : (
        <LoadingData />
      )}
    </>
  );
};

export default PostedContainer;
