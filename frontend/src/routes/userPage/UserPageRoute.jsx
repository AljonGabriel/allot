import AppNavbar from '../../component/navbar/AppNavbar';
import { Container, Stack } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetUploadsByIdQuery } from './../../states/slices/uploads/apiUploadsEndpoints';
import { useGetProfileQuery } from '../../states/slices/users/apiUsersEndpoints';

import UserProfileHeader from '../../component/userProfile/UserProfileHeader';
import UserProfile from '../../component/userProfile/UserProfilePosts';
import UserProfileBio from '../../component/userProfile/userProfileBio';

const UserPageRoute = () => {
  const [userData, setUserData] = useState();
  const [uploadData, setUploadData] = useState();

  const { id } = useParams();

  const { data: userProfile, isLoading } = useGetProfileQuery({ id });

  const { data: userUploads } = useGetUploadsByIdQuery({ id });

  useEffect(() => {
    if (userProfile && userUploads) {
      setUserData(userProfile?.user);
      setUploadData(userUploads?.userPost || []);
    }
  }, [userProfile, userUploads]);

  return (
    <>
      <AppNavbar />
      <Container
        className='pt-3'
        style={{ marginTop: '66px' }}>
        <UserProfileHeader userData={userData} />
        <section
          className='d-flex gap-3 mt-3 '
          style={{ height: '500px' }}>
          <UserProfileBio />
          <UserProfile
            uploadData={uploadData}
            userData={userData}
          />
        </section>
      </Container>
    </>
  );
};

export default UserPageRoute;
