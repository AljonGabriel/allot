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
import MoreCommentsModal from './moreCommentsModal';

const Comments = ({ post, userInfo, toggleCommentField, showField }) => {
  const postId = post._id;

  //useStates
  const [inputData, setInputData] = useState({
    fePostId: postId,
  });
  const [modalShow, setModalShow] = useState(false);

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
    <section className='mx-3'>
      {comment && comment.length >= 2 && (
        <div>
          <p className='d-block my-2'> {comment.length} Comments </p>
        </div>
      )}

      {comment && comment.length >= 2 && (
        <div className='my-1'>
          <small
            onClick={() => setModalShow(true, toggleCommentField)}
            style={{ cursor: 'pointer' }}>
            <strong onClick={toggleCommentField}>View more comments</strong>
          </small>
          <MoreCommentsModal
            show={modalShow}
            onHide={() => setModalShow(false, toggleCommentField)}
            comment={comment}
            userInfo={userInfo}
            post={post}
            showField={showField}
          />
        </div>
      )}
      {!isLoading ? (
        comment &&
        comment.length > 0 && (
          <section className='my-2 p-2 gap-3 bg-white-secondary border border-secondary-white rounded border-1'>
            <LinkContainer to={`/userPage/${comment[0].commentedById._id}`}>
              <div className='d-flex gap-2 align-items-center'>
                <Image
                  src={`http://localhost:5000/${comment[0].commentedById._id}/profilePictures/${comment[0].commentedById.profileImage}`}
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
                  <h5 className='m-0 p-0'>{comment[0].commentedBy}</h5>
                  <small className='text-muted white me-2'>
                    <TimeAgo date={comment[0].createdAt} />
                  </small>
                </div>
              </div>
            </LinkContainer>
            <div>
              <p className='comment mt-2'>{comment[0].comment}</p>
            </div>
          </section>
        )
      ) : (
        <LoadingData />
      )}
    </section>
  );
};

export default Comments;
