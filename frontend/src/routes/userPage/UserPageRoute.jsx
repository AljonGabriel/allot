import AppNavbar from '../../component/navbar/AppNavbar';
import { Container, Stack } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetUploadsByIdQuery } from './../../states/slices/uploads/apiUploadsEndpoints';
import { useGetProfileQuery } from '../../states/slices/users/apiUsersEndpoints';

import UserProfileHeader from '../../component/userProfile/UserProfileHeader';
import UserProfile from '../../component/userProfile/UserProfilePosts';
import UserProfileBio from '../../component/userProfile/userProfileBio';

import PostModal from '../../component/postModal/PostModal';
import { useSelector } from 'react-redux';

const UserPageRoute = () => {
  const [userData, setUserData] = useState();
  const [uploadData, setUploadData] = useState();

  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const { data: userProfile, isLoading } = useGetProfileQuery({ id });

  const { data: userUploads } = useGetUploadsByIdQuery({ id });

  useEffect(() => {
    if (userProfile && userUploads) {
      setUserData(userProfile.user);
      setUploadData(userUploads?.userPost || []);
    }
  }, [userProfile, userUploads, userData, uploadData]);

  return (
    <>
      <AppNavbar />
      <Container
        style={{ marginTop: '66px' }}
        fluid>
        {' '}
        <UserProfileHeader
          userData={userData}
          uploadData={uploadData}
        />
      </Container>
      <Container className='d-flex gap-3 mt-3'>
        <section className='w-25'>
          <div className='mb-3'>
            <UserProfileBio userData={userData} />
          </div>
        </section>

        <div className='w-75'>
          {userData && String(userData._id) === String(userInfo._id) ? (
            <PostModal />
          ) : (
            ''
          )}
          <UserProfile
            uploadData={uploadData}
            userData={userData}
          />
        </div>
      </Container>
    </>
  );
};

export default UserPageRoute;
