import { Container } from 'react-bootstrap';
import AppNavbar from './../../component/navbar/AppNavbar';
import ProfileSection from '../../component/profileSection/ProfileSection';
import PostSeciton from '../../component/postSection/PostSeciton';

const HomeRoute = () => {
  return (
    <>
      <AppNavbar />
      <Container className='d-flex justify-content-start mt-3'>
        <ProfileSection />
        <PostSeciton />
      </Container>
    </>
  );
};

export default HomeRoute;
