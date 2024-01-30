import { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Send } from 'react-bootstrap-icons';

//Endpoints
import { useAddCommentMutation } from '../../states/slices/comments/apiCommentsEndpoints';
import { setCommentAction } from '../../states/slices/comments/commentsSlice';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../loading/LoadingSpinner';

const CommentField = ({ post, userInfo, showField }) => {
  const postId = post._id;
  const postedBy = post.uploadedBy;
  const postedById = post.uploadedUserID;
  const commentedBy =
    userInfo.fname + ' ' + userInfo.mname + ' ' + userInfo.lname;
  const loggedUser = userInfo._id;

  //useStates
  const [inputData, setInputData] = useState({
    fePostId: postId,
    fePostedBy: postedBy,
    fePostedById: postedById,
    feCommentedBy: commentedBy,
    feCommentedById: loggedUser,
    feUserComment: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleData = (event) => {
    setInputData({ ...inputData, feUserComment: event.target.value });
  };

  const [commented, { isLoading }] = useAddCommentMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await commented(inputData).unwrap();
      dispatch(setCommentAction(res));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showField && (
        <section className='p-1'>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                type='text'
                placeholder='Write a public comment'
                onChange={handleData}
                value={inputData.feUserComment}
              />
              <Button
                size='lg'
                type='submit'
                disabled={isLoading || !inputData.feUserComment}>
                {isLoading ? <LoadingSpinner /> : <Send />}
              </Button>
            </InputGroup>
          </Form>
        </section>
      )}
    </>
  );
};

export default CommentField;
