import { Container } from 'react-bootstrap';
import AppNavbar from './../../component/navbar/AppNavbar';
import ProfileSection from '../../component/profileSection/ProfileSection';
import PostSeciton from '../../component/postSection/PostSeciton';

//css
import './homeRoute.css';

const HomeRoute = () => {
  return (
    <>
      <AppNavbar />
      <Container
        style={{ paddingTop: '100px' }}
        className='bg'
        fluid>
        <ProfileSection />
        <PostSeciton />
      </Container>
    </>
  );
};

export default HomeRoute;
