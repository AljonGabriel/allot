import AppNavbar from '../../component/navbar/AppNavbar';
import { Container } from 'react-bootstrap';
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
  const [viewedUser, setViewedUser] = useState();
  const [viewedUserPosts, setViewedUserPosts] = useState();

  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const { data: userProfile } = useGetProfileQuery({ id });

  const { data: userUploads } = useGetUploadsByIdQuery({ id });

  useEffect(() => {
    if (userProfile && userUploads) {
      setViewedUser(userProfile.user);
      setViewedUserPosts(userUploads?.userPost || []);
    }
  }, [userProfile, userUploads, viewedUser, viewedUserPosts]);

  return (
    <>
      <AppNavbar />
      <Container
        style={{ marginTop: '66px' }}
        fluid>
        {' '}
        <UserProfileHeader
          viewedUser={viewedUser}
          userInfo={userInfo}
        />
      </Container>
      <Container className='d-flex gap-3 mt-3'>
        <section className='w-25'>
          <div className='mb-3'>
            <UserProfileBio viewedUser={viewedUser} />
          </div>
        </section>

        <div className='w-75'>
          {viewedUser && String(viewedUser._id) === String(userInfo._id) ? (
            <PostModal />
          ) : (
            ''
          )}
          <UserProfile
            viewedUserPosts={viewedUserPosts}
            viewedUser={viewedUser}
          />
        </div>
      </Container>
    </>
  );
};

export default UserPageRoute;
