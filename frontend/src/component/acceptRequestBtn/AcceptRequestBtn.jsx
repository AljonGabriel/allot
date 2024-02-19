/* eslint-disable react/prop-types */
import { Button } from 'react-bootstrap';
import {
  useAcceptRequestMutation,
  useCheckRequestQuery,
} from '../../states/slices/friends/apiFriendsEndpoints';
import { setFriendAction } from '../../states/slices/friends/friendsSlice';
import { setNotificationSlice } from '../../states/slices/notifications/notificationSlice';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../loading/LoadingSpinner';
import { useEffect, useState } from 'react';

const AcceptRequestBtn = (props) => {
  const [friendRequest, setFriendRequest] = useState();

  const feRequesteeId = props.userInfo._id;
  const feRequesteeName =
    friendRequest && friendRequest[props.index].requesteeName;
  const feRequesterId = friendRequest && friendRequest[props.index].requesterId;
  const feRequesterName =
    friendRequest && friendRequest[props.index].requesterName;

  const feNotifiCationId = props.notifications[props.index]._id;

  const dispatch = useDispatch();

  const { data } = useCheckRequestQuery({
    feRequesteeId,
  });

  const [accepted, { isLoading }] = useAcceptRequestMutation();

  useEffect(() => {
    setFriendRequest(data);
  }, [data]);

  const handleAccept = async (e) => {
    e.preventDefault();

    try {
      const res = await accepted({
        feRequesteeId,
        feRequesterId,
        feRequesteeName,
        feRequesterName,
        feNotifiCationId,
      }).unwrap();
      dispatch(setFriendAction(res));
      dispatch(setNotificationSlice(res));

      props.refetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {friendRequest && (
        <Button
          variant='primary'
          size='md'
          onClick={(e) => handleAccept(e)}
          disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : 'Confirm'}
        </Button>
      )}
    </>
  );
};

export default AcceptRequestBtn;
