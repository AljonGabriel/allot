import { useSelector } from 'react-redux';
import { Image, Stack } from 'react-bootstrap';
import defBoyImg from './../../assets/defaultImg/DefaultBoy.jpg';
import defGirlImg from './../../assets/defaultImg/DefaultGirl.jpg';
import defImg from './../../assets/defaultImg/Default.jpg';

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
            <Image
              src={
                userInfo.gender === 'Male'
                  ? defBoyImg
                  : userInfo.gender === 'Female'
                  ? defGirlImg
                  : defImg
              }
              alt={
                userInfo.gender === 'Male'
                  ? defBoyImg
                  : userInfo.gender === 'Female'
                  ? defGirlImg
                  : defImg
              }
              style={{ width: '40px', height: '40px' }}
              roundedCircle
            />
            <span>{userName}</span>
          </Stack>
        </a>
      </section>
    </>
  );
};

export default ProfileSection;
