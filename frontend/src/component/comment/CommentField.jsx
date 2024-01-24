import { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Send } from 'react-bootstrap-icons';

//Endpoints
import { useAddCommentMutation } from '../../states/slices/comments/apiCommentsEndpoints';
import { setCommentAction } from '../../states/slices/comments/commentsSlice';

import { useDispatch } from 'react-redux';
import LoadingSpinner from '../loading/LoadingSpinner';

const CommentField = ({ post, userInfo }) => {

  const loggedUser = 


  const [inputData, setInputData] = useState({
    fePostId: '',
    fePostedBy: '',
    fePostedById: '',
    feCommentedBy: '',
    feCommentedById: '',
    feUserComment: '',
  });

  console.log('Fomr Comment Field: ', post);

  const dispatch = useDispatch();

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

  console.log(inputData);

  return (
    <>
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
            disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : <Send />}
          </Button>
        </InputGroup>
      </Form>
    </>
  );
};

export default CommentField;
