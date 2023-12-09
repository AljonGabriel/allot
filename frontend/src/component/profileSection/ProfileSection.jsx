import { useSelector } from 'react-redux';

import { UserProfileImage } from '../userProfileImage/userProfileImage';

const ProfileSection = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userName = userInfo.fname + ' ' + userInfo.mname + ' ' + userInfo.lname;
  return (
    <>
      <section className='w-auto position-fixed'>
        <a
          href='#home'
          className='btn btn-outline-secondary border-0 text-black'>
          <UserProfileImage />
          <h6 className='d-inline ms-3'>{userName}</h6>
        </a>
      </section>
    </>
  );
};

export default ProfileSection;
