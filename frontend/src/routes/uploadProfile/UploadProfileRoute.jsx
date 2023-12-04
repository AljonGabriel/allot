import { Container } from 'react-bootstrap';
import ProfilePicture from '../../component/profilePicture/ProfilePicture';

const UploadProfileRoute = () => {
  return (
    <>
      <Container className='d-grid align-items-center justify-content-center w-10- vh-100'>
        <ProfilePicture />
      </Container>
    </>
  );
};

export default UploadProfileRoute;
