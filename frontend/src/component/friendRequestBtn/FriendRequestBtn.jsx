import { Button, Dropdown } from 'react-bootstrap';
import { Check, PersonAdd } from 'react-bootstrap-icons';

import { useEffect, useState } from 'react';

import { useAddMutation } from '../../states/slices/friends/apiFriendsEndpoints';
import { useCheckRequestQuery } from '../../states/slices/friends/apiFriendsEndpoints';
import { useCheckIfFriendQuery } from '../../states/slices/friends/apiFriendsEndpoints';

import { setFriendAction } from '../../states/slices/friends/friendsSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../loading/LoadingSpinner';
import CancelRequestBtn from '../cancelRequestBtn/CancelRequestBtn';

const FriendRequestBtn = ({ viewedUser, userInfo }) => {
  const [checkRequest, setCheckRequest] = useState(null);
  const [friend, setFriend] = useState(null);

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

  const { data: request, refetch } = useCheckRequestQuery({
    feRequesterId: loggedUserId,
    feRequesteeId: requesteeId,
  });

  const { data: isFriend } = useCheckIfFriendQuery({
    loggedInUserId: loggedUserId,
    otherUserId: requesteeId,
  });

  useEffect(() => {
    const checkIfFriend = async () => {
      setFriend(isFriend.areFriends);
    };

    const reFetch = async () => {
      setCheckRequest(request);
      await refetch();
    };

    checkIfFriend();
    reFetch();
  }, [request, friendAction, refetch, isFriend]); // Include data in the dependency array

  console.log('friend', friend);

  const [addRequest, { isLoading }] = useAddMutation();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const addFriend = await addRequest(feData).unwrap();
      dispatch(setFriendAction(addFriend));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {friend ? (
        <Dropdown>
          <Dropdown.Toggle variant='outline-primary'>
            <Check size={20} />
            <small className='ms-1'>Friend</small>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item className='text-danger'>Unfriend</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : checkRequest <= 0 ? (
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
