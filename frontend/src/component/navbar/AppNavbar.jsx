import { Navbar, Nav, NavDropdown, Container, Image } from 'react-bootstrap';
import LogoutBtn from '../logoutBtn/LogoutBtn';
import { useSelector } from 'react-redux';
import defBoyImg from './../../assets/defaultImg/DefaultBoy.jpg';
import defGirlImg from './../../assets/defaultImg/DefaultGirl.jpg';
import defImg from './../../assets/defaultImg/Default.jpg';

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
              <Navbar.Brand href='#home'>Allot</Navbar.Brand>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto'>
                  <Nav.Link href='#home'>Home</Nav.Link>
                </Nav>
                <NavDropdown
                  title={
                    <span>
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
