import { Button } from 'react-bootstrap';
import { PersonAdd } from 'react-bootstrap-icons';

import { useEffect, useState } from 'react';

import { useAddMutation } from '../../states/slices/friends/apiFriendsEndpoints';
import { useCheckRequestQuery } from '../../states/slices/friends/apiFriendsEndpoints';

import { setRequest } from '../../states/slices/friends/friendsSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../loading/LoadingSpinner';

const FriendRequestBtn = ({ viewedUser, userInfo }) => {
  const [checkRequest, setCheckRequest] = useState(null);

  const requesterName =
    userInfo.fname + ' ' + userInfo.mname + ' ' + userInfo.lname;

  const requesteeName =
    viewedUser.fname + ' ' + viewedUser.mname + ' ' + viewedUser.lname;

  const loggedUserId = userInfo._id;
  const requesteeId = viewedUser._id;

  const dispatch = useDispatch();

  const { friendRequest } = useSelector((state) => state.friends);

  console.log('Friend R:' + friendRequest);

  const feData = {
    feRequesterId: loggedUserId,
    feRequesterName: requesterName,
    feRequesteeId: requesteeId,
    feRequesteeName: requesteeName,
  };

  const { data, refetch } = useCheckRequestQuery({
    feRequesterId: loggedUserId,
    feRequesteeId: requesteeId,
  });

  useEffect(() => {
    const reFetch = async () => {
      setCheckRequest(data?.checked);
      await refetch();
    };

    reFetch();
  }, [data, friendRequest]); // Include data in the dependency array

  console.log(data);

  const [addRequest, { isLoading }] = useAddMutation();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const sent = await addRequest(feData).unwrap();
      dispatch(setRequest({ sent }));
    } catch (err) {
      console.log(err);
    }
  };

  console.log(checkRequest);

  return (
    <>
      {!checkRequest ? (
        <Button
          variant='primary'
          onClick={(e) => handleClick(e)}
          disabled={isLoading}>
          <PersonAdd size={20} />
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <small className='ms-1'>Add friend</small>
          )}
        </Button>
      ) : (
        <Button variant='outline-danger'>
          <PersonAdd size={20} />
          <small className='ms-1'>Cancel request</small>
        </Button>
      )}
    </>
  );
};

export default FriendRequestBtn;
