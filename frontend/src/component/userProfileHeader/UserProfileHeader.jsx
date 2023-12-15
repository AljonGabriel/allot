import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

const UserProfileHeader = ({ userData }) => {
  const userName = `${userData?.fname} ${userData?.mname} ${userData?.lname}`;

  console.log('UPHeaderL', userData);

  return (
    <>
      <header className='d-flex align-items-center gap-3'>
        <Image
          src={`http://localhost:5000/${userData?._id}/profilePictures/${userData?.profileImage}`}
          alt={userData?.fname}
          style={{
            width: '200px',
            height: '200px',
            objectFit: 'cover',
          }}
          roundedCircle
          className=' border boder-black boder-1 shadow'
        />
        <div>
          <h2>{userName}</h2>
        </div>
      </header>
    </>
  );
};

UserProfileHeader.propTypes = {
  userData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    fname: PropTypes.string.isRequired,
    mname: PropTypes.string,
    lname: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfileHeader;
