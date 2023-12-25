import { Button } from 'react-bootstrap';
import { PersonAdd } from 'react-bootstrap-icons';

import { useAddMutation } from '../../states/slices/friends/apiFriendsEndpoints';
import { useState } from 'react';

const FriendRequestBtn = ({ viewedUser, userInfo }) => {
  const [data, setData] = useState({
    feRequesterId: userInfo._id,
    feRequesterName:
      userInfo.fname + ' ' + userInfo.mname + ' ' + userInfo.lname,
    feRequesteeId: viewedUser._id,
    feRequesteeName:
      viewedUser.fname + ' ' + viewedUser.mname + ' ' + viewedUser.lname,
  });

  const [requested, setRequested] = useState(undefined);

  const [addRequest, { isLoading }] = useAddMutation();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await addRequest(data).unwrap();
      setRequested(res);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(requested);

  return (
    <>
      {!requested && (
        <Button
          variant='primary'
          onClick={(e) => handleClick(e)}>
          <PersonAdd size={20} />
          <small className='ms-1'>Add friend</small>
        </Button>
      )}
    </>
  );
};

export default FriendRequestBtn;
