//endpoints
import { useEffect, useState } from 'react';
import { useViewPostCommentsQuery } from '../../states/slices/comments/apiCommentsEndpoints';
import { useSelector } from 'react-redux';
import { Image, Stack } from 'react-bootstrap';

import TimeAgo from '../../utils/TimeAgo';
import LoadingData from '../loading/LoadingData';

const defMaleImg = 'http://localhost:5000/defaultImg/defaultMale.jpg';
const defFemaleImg = 'http://localhost:5000/defaultImg/defaultFemale.jpg';
const defImg = 'http://localhost:5000/defaultImg/Default.jpg';

import './comments.css';
import { LinkContainer } from 'react-router-bootstrap';

const Comments = ({ post, userInfo }) => {
  const postId = post._id;
  const [inputData, setInputData] = useState({
    fePostId: postId,
  });
  const { commentAction } = useSelector((state) => state.comments);

  const {
    data: comment,
    isLoading,
    refetch,
  } = useViewPostCommentsQuery(inputData);

  useEffect(() => {
    const reFetchComments = async () => {
      await refetch();
    };

    reFetchComments();
  }, [commentAction, refetch]);

  console.log(comment);

  return (
    <>
      {!isLoading ? (
        comment ? (
          comment.map((userComment, index) => (
            <section
              key={index}
              className='my-1 p-2 gap-3 bg-white-secondary border border-secondary-white rounded border-1'>
              <LinkContainer to={`/userPage/${userComment.commentedById._id}`}>
                <div className='d-flex gap-2 align-items-center'>
                  <Image
                    src={`http://localhost:5000/${userComment.commentedById._id}/profilePictures/${userComment.commentedById.profileImage}`}
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
                    <h5 className='m-0 p-0'>{userComment.commentedBy}</h5>
                    <small className='text-muted white me-2'>
                      <TimeAgo date={userComment.createdAt} />
                    </small>
                  </div>
                </div>
              </LinkContainer>
              <div>
                <p className='comment mt-2'>{userComment.comment}</p>
              </div>
            </section>
          ))
        ) : (
          'No Comment'
        )
      ) : (
        <LoadingData />
      )}
    </>
  );
};

export default Comments;
