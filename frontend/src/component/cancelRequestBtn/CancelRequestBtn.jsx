import { Button } from 'react-bootstrap';
import { PersonAdd } from 'react-bootstrap-icons';

import { setFriendAction } from '../../states/slices/friends/friendsSlice';
import { useCancelRequestMutation } from '../../states/slices/friends/apiFriendsEndpoints';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../loading/LoadingSpinner';

const CancelRequestBtn = ({ feData, refetch }) => {
  const [cancel, { isLoading }] = useCancelRequestMutation();

  const dispatch = useDispatch();

  const handleCancelRequest = async (e) => {
    e.preventDefault();

    try {
      const cancelledData = await cancel(feData).unwrap();
      dispatch(setFriendAction({ ...cancelledData }));
      await refetch();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button
      variant='danger'
      onClick={(e) => handleCancelRequest(e)}
      disabled={isLoading}>
      <PersonAdd size={20} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <small className='ms-1'>Cancel request</small>
      )}
    </Button>
  );
};

export default CancelRequestBtn;
