import { useSelector } from 'react-redux';
import { Stack } from 'react-bootstrap';

import { UserProfileImage } from '../userProfileImage/userProfileImage';

const ProfileSection = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const userName = userInfo.fname + ' ' + userInfo.mname + ' ' + userInfo.lname;
  return (
    <>
      <section className='w-50'>
        <a
          href=''
          className='btn btn-outline-secondary border-0 text-black'>
          <Stack
            direction='horizontal'
            gap={3}>
            <UserProfileImage />
            <span>{userName}</span>
          </Stack>
        </a>
        <a
          href=''
          className='btn btn-outline-secondary border-0 text-black'>
          More feature soon
        </a>
      </section>
    </>
  );
};

export default ProfileSection;
