import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Image,
} from 'react-bootstrap';
import LogoutBtn from '../logoutBtn/LogoutBtn';
import { useSelector } from 'react-redux';
import { UserProfileImage } from '../userProfileImage/userProfileImage';
import { Search } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import './appNavbar.css';
import { LinkContainer } from 'react-router-bootstrap';
import { useSearchQuery } from '../../states/slices/users/apiUsersEndpoints';

const AppNavbar = () => {
  const [search, setSearch] = useState([]);
  const [key, setKey] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const { data, isLoading, isError } = useSearchQuery({
    key,
    limit: 5,
  });

  useEffect(() => {
    const search = async () => {
      try {
        if (!key.trim()) {
          setSearch([]);
          return;
        }

        setSearch(data);
        console.log('Users Log:' + data);
      } catch (err) {
        console.log(isError);
      }
    };

    search();
  }, [key]);

  console.log(key);
  return (
    <>
      <Navbar
        expand='lg'
        className='bg-body-tertiary px-3'
        fixed='top'>
        {userInfo && (
          <>
            <Container fluid>
              <Navbar.Brand
                href='/home'
                className='text-accent fw-bold'>
                A
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='me-auto position-relative'>
                  <Form className='d-flex'>
                    <Form.Control
                      type='search'
                      placeholder='Search'
                      className='me-2 w-100'
                      aria-label='Search'
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                    />
                  </Form>

                  {search &&
                    search.length > 0 &&
                    search.map((user) => (
                      <div
                        key={user._id}
                        className='search-result  bg-white p-3'>
                        <LinkContainer to={`/userPage/${user._id}`}>
                          <div className='d-flex align-items-center gap-3'>
                            <div>
                              <Image
                                src={`http://localhost:5000/${user._id}/profilePictures/${user.profileImage} `}
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'cover',
                                }}
                                roundedCircle
                                className='m-auto'
                              />
                            </div>
                            <div>
                              <div className='text-nowrap'>
                                <small>
                                  {user.fname +
                                    ' ' +
                                    user.mname +
                                    '' +
                                    user.lname}
                                </small>
                              </div>
                            </div>
                          </div>
                        </LinkContainer>
                      </div>
                    ))}
                </Nav>

                <NavDropdown
                  title={
                    <span>
                      <UserProfileImage />
                    </span>
                  }
                  drop='down'
                  align='end'>
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
