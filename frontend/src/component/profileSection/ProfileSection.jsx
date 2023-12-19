import { useSelector } from 'react-redux';

import { UserProfileImage } from '../userProfile/UserProfileImage';
import { LinkContainer } from 'react-router-bootstrap';

const ProfileSection = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userName = userInfo.fname + ' ' + userInfo.mname + ' ' + userInfo.lname;
  return (
    <>
      <LinkContainer
        to={`/userPage/${userInfo._id}`}
        className='btn btn-outline-secondary border-0 text-black'>
        <section className='w-auto position-fixed'>
          <>
            <UserProfileImage />
            <h6 className='d-inline ms-3'>{userName}</h6>
          </>
        </section>
      </LinkContainer>
    </>
  );
};

export default ProfileSection;
