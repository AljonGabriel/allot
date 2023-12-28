import { Button } from 'react-bootstrap';
import { PersonAdd } from 'react-bootstrap-icons';

import { useEffect, useState } from 'react';

import { useAddMutation } from '../../states/slices/friends/apiFriendsEndpoints';
import { useCheckRequestQuery } from '../../states/slices/friends/apiFriendsEndpoints';

import { setFriendAction } from '../../states/slices/friends/friendsSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../loading/LoadingSpinner';
import CancelRequestBtn from '../cancelRequestBtn/CancelRequestBtn';

const FriendRequestBtn = ({ viewedUser, userInfo }) => {
  const [checkRequest, setCheckRequest] = useState(null);

  const requesterName =
    userInfo.fname + ' ' + userInfo.mname + ' ' + userInfo.lname;

  const requesteeName =
    viewedUser.fname + ' ' + viewedUser.mname + ' ' + viewedUser.lname;

  const loggedUserId = userInfo._id;
  const requesteeId = viewedUser._id;

  const dispatch = useDispatch();

  const { friendAction } = useSelector((state) => state.friends);

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
      setCheckRequest(data);
      await refetch();
    };

    reFetch();
  }, [data, friendAction]); // Include data in the dependency array

  console.log('Data from check request', checkRequest);

  const [addRequest, { isLoading }] = useAddMutation();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const sent = await addRequest(feData).unwrap();
      dispatch(setFriendAction({ ...sent }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {checkRequest <= 0 ? (
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
        <CancelRequestBtn feData={feData} />
      )}
    </>
  );
};

export default FriendRequestBtn;
