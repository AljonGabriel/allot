import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Button,
} from 'react-bootstrap';
import LogoutBtn from '../logoutBtn/LogoutBtn';
import { useSelector } from 'react-redux';
import { UserProfileImage } from '../userProfileImage/userProfileImage';
import { Search } from 'react-bootstrap-icons';

const AppNavbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <Navbar
        expand='lg'
        className='bg-body-tertiary'>
        {userInfo && (
          <>
            <Container>
              <Navbar.Brand
                href='/home'
                className='text-accent fw-bold'>
                Allot
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto'>
                  <Form className='d-flex'>
                    <Form.Control
                      type='search'
                      placeholder='Search'
                      className='me-2'
                      aria-label='Search'
                    />
                    <Button variant='outline-secondary'>
                      <Search size={16} />
                    </Button>
                  </Form>
                </Nav>
                <NavDropdown
                  title={
                    <span>
                      <UserProfileImage />
                    </span>
                  }>
                  <NavDropdown.Item href='#action/3.1'>
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <LogoutBtn />
                  </NavDropdown.Item>
                </NavDropdown>
              </Navbar.Collapse>
            </Container>
          </>
        )}
      </Navbar>
    </>
  );
};

export default AppNavbar;
