import AppNavbar from '../../component/navbar/AppNavbar';
import { Container } from 'react-bootstrap';
import UserProfile from '../../component/userProfile/UserProfile';

const UserPageRoute = () => {
  return (
    <>
      <AppNavbar />
      <Container
        className='pt-3'
        style={{ marginTop: '66px' }}>
        <UserProfile />
      </Container>
    </>
  );
};

export default UserPageRoute;
