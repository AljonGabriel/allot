import AppNavbar from '../../component/navbar/AppNavbar';
import { Container } from 'react-bootstrap';
import UserProfile from '../../component/userProfile/UserProfile';

const UserPageRoute = () => {
  return (
    <>
      <AppNavbar />
      <Container
        className=''
        style={{ marginTop: '66px' }}
        fluid>
        <UserProfile />
      </Container>
    </>
  );
};

export default UserPageRoute;
