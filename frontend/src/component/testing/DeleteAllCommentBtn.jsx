import { useDeleteAllCommentMutation } from '../../states/slices/comments/apiCommentsEndpoints';
import { Button } from 'react-bootstrap';
import { setCommentAction } from '../../states/slices/comments/commentsSlice';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../loading/LoadingSpinner';

const DeleteAllCommentBtn = () => {
  const [deleted, { isLoading }] = useDeleteAllCommentMutation();

  const dispatch = useDispatch();

  const handleDeleteComment = async (event) => {
    event.preventDefault();

    console.log('Clicked');

    try {
      const res = await deleted().unwrap();
      dispatch(setCommentAction({ ...res }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button
        variant='outline-danger'
        onClick={handleDeleteComment}
        disabled={isLoading}>
        {isLoading ? <LoadingSpinner /> : 'Delete all comment'}
      </Button>
    </>
  );
};

export default DeleteAllCommentBtn;
