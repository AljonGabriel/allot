import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Image,
  InputGroup,
} from 'react-bootstrap';
import LogoutBtn from '../logoutBtn/LogoutBtn';
import { useSelector } from 'react-redux';
import { UserProfileImage } from './../userProfile/UserProfileImage';
import { Search, House, People } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import './appNavbar.css';
import { LinkContainer } from 'react-router-bootstrap';
import { useSearchQuery } from '../../states/slices/users/apiUsersEndpoints';

import { useCheckRequestQuery } from '../../states/slices/friends/apiFriendsEndpoints';

import { NavLink } from 'react-router-dom';

import DeleteAllCommentBtn from '../testing/deleteAllCommentBtn';
import DeleteAllPost from '../testing/DeleteAllPost';
import Notifications from '../notifications/Notifications';

const AppNavbar = () => {
  const [search, setSearch] = useState([]);
  const [key, setKey] = useState('');

  const [friendRequest, setFriendRequest] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);

  const { friendAction } = useSelector((state) => state.friends);

  const feRequesteeId = userInfo._id;

  const { data: searchData } = useSearchQuery({
    key,
    limit: 5,
  });

  const { data: checkedRequestData, refetch } = useCheckRequestQuery({
    feRequesteeId,
  });

  useEffect(() => {
    try {
      if (key.trim()) {
        setSearch(searchData ? searchData : []);
      } else {
        setSearch([]);
      }
    } catch (err) {
      console.log(err);
    }

    // Remove friendRequest from the dependency array
  }, [key, searchData]);

  useEffect(() => {
    const fetchFriendRequest = async () => {
      try {
        setFriendRequest(checkedRequestData ? checkedRequestData : []);
        await refetch();
      } catch (err) {
        console.log(err);
      }
    };

    // Call the fetchFriendRequest function whenever friendAction changes
    fetchFriendRequest();

    // Assuming friendAction is a dependency you want to track
  }, [checkedRequestData, friendAction, refetch]); // Add other dependencies as needed

  console.log('Friend Request', friendRequest);

  return (
    <>
      <Navbar
        className='bg-body-tertiary px-3 align-items-center '
        expand='lg'
        fixed='top'>
        <Container fluid>
          {userInfo && (
            <>
              {' '}
              <Navbar.Brand
                href='/home'
                className='text-accent fw-bold'>
                allot
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='position-relative align-items-center justify-content-between w-100'>
                  <section className='d-flex align-items-center'>
                    <Form className='me-3'>
                      <InputGroup>
                        <Form.Control
                          type='search'
                          placeholder='Search'
                          aria-label='Search'
                          className=' border border-end-0'
                          value={key}
                          onChange={(e) => setKey(e.target.value)}
                          aria-describedby='basic-addon1'
                        />

                        <InputGroup.Text
                          id='basic-addon1'
                          className='bg-white border border-start-0'>
                          <Search />
                        </InputGroup.Text>
                      </InputGroup>

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
                    </Form>
                    <div className='d-flex gap-3 cursor-pointer align-items-center'>
                      <NavLink
                        to='/home'
                        className='nav-link-item'
                        style={{ cursor: 'pointer' }}>
                        <House size={25} />
                      </NavLink>
                      <NavLink
                        to='/friendRequest'
                        className='  nav-link-item'
                        style={{ cursor: 'pointer' }}>
                        <People size={25} />
                      </NavLink>
                      <DeleteAllCommentBtn />
                      <DeleteAllPost />
                    </div>
                  </section>

                  <div className='d-flex align-items-center'>
                    <Notifications />
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
                  </div>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
