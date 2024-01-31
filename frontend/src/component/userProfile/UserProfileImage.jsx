import { useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';

const defMaleImg = 'http://localhost:5000/defaultImg/defaultMale.jpg';
const defFemaleImg = 'http://localhost:5000/defaultImg/defaultFemale.jpg';
const defImg = 'http://localhost:5000/defaultImg/Default.jpg';

const UserProfileImage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const userProfilePath = `http://localhost:5000/${userInfo._id}/profilePictures/${userInfo.profileImage} `;

  return (
    <Image
      src={
        userProfilePath
          ? userProfilePath
          : userInfo.gender === 'male'
          ? defMaleImg
          : userInfo.gender === 'female'
          ? defFemaleImg
          : defImg
      }
      alt={
        userInfo.gender === 'Male'
          ? 'Male Avatar'
          : userInfo.gender === 'Female'
          ? 'Male Avatar'
          : 'Default Avatar'
      }
      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
      roundedCircle
    />
  );
};

export { UserProfileImage };
