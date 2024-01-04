/* eslint-disable react/prop-types */
import { Button } from 'react-bootstrap';
import { useAcceptRequestMutation } from '../../states/slices/friends/apiFriendsEndpoints';
import { setFriendAction } from '../../states/slices/friends/friendsSlice';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../loading/LoadingSpinner';

const AcceptRequestBtn = ({ friendRequest }) => {
  const dispatch = useDispatch();

  const feRequesteeId = friendRequest.requesteeId;
  const feRequesterId = friendRequest.requesterId;

  console.log(feRequesteeId, feRequesterId);

  const [accepted, { isLoading }] = useAcceptRequestMutation();

  const handleAccept = async (e) => {
    e.preventDefault();

    try {
      const res = await accepted({ feRequesteeId, feRequesterId }).unwrap();
      dispatch(setFriendAction(res));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button
      variant='primary'
      size='sm'
      onClick={(e) => handleAccept(e)}
      disabled={isLoading}>
      {isLoading ? <LoadingSpinner /> : 'Confirm'}
    </Button>
  );
};

export default AcceptRequestBtn;
