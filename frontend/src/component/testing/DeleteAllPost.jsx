import { Button } from 'react-bootstrap';
import { useDeleteAllPostMutation } from '../../states/slices/uploads/apiUploadsEndpoints';
import LoadingSpinner from '../loading/LoadingSpinner';

const DeleteAllPost = () => {
  const [deleted, { isLoading }] = useDeleteAllPostMutation();

  const handleDeleteAllPostClick = async (event) => {
    event.preventDefault();
    try {
      await deleted().unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        onClick={handleDeleteAllPostClick}
        variant='danger'
        disabled={isLoading}>
        {isLoading ? <LoadingSpinner /> : ' Delete all post'}
      </Button>
    </>
  );
};

export default DeleteAllPost;
