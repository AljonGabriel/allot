import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { Image } from 'react-bootstrap';
import AppNavbar from '../../component/navbar/AppNavbar';

const UserPageRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <AppNavbar />
      {userInfo && (
        <div className='mt-5 d-flex'>
          <Image
            src={`http://localhost:5000/${userInfo._id}/profilePictures/${userInfo.profileImage}`}
            width={50}
          />
          <h2>Hi!,{userInfo.fname}</h2>
        </div>
      )}
    </>
  );
};

export default UserPageRoute;
