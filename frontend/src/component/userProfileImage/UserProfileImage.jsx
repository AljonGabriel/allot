import { useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';
import defBoyImg from './../../assets/defaultImg/DefaultBoy.jpg';
import defGirlImg from './../../assets/defaultImg/DefaultGirl.jpg';
import defImg from './../../assets/defaultImg/Default.jpg';
import { useEffect, useState } from 'react';

const UserProfileImage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userProfileImage, setUserProfileImage] = useState('');

  useEffect(() => {
    // Update the component state when userInfo changes
    setUserProfileImage(userInfo.profileImage);
  }, [userInfo]);

  return (
    <Image
      src={
        userProfileImage
          ? userProfileImage
          : userInfo.gender === 'Male'
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
      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
      roundedCircle
      className='m-auto'
    />
  );
};

export { UserProfileImage };
