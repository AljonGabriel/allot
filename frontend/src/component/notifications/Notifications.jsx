import { NavDropdown, Image, Button, Badge } from 'react-bootstrap';

import { Bell } from 'react-bootstrap-icons';

import { LinkContainer } from 'react-router-bootstrap';

import AcceptRequestBtn from '../acceptRequestBtn/AcceptRequestBtn';
import { useFetchNotificationQuery } from '../../states/slices/notifications/apiNotificationEndpoints';
import { useEffect, useState } from 'react';

const defMaleImg = 'http://localhost:5000/defaultImg/defaultMale.jpg';
const defFemaleImg = 'http://localhost:5000/defaultImg/defaultFemale.jpg';
const defImg = 'http://localhost:5000/defaultImg/Default.jpg';

const Notifications = (props) => {
  const [notifications, setNotification] = useState(null);

  const loggedInUser = props.userInfo;
  const loggedInUserId = loggedInUser._id;

  console.log(loggedInUserId);

  const { data, isLoading } = useFetchNotificationQuery({
    feLoggedInUserId: loggedInUserId,
  });

  useEffect(() => {
    setNotification(data);
  }, [data]);

  console.log('Notifications:', notifications);
  return (
    <>
      <NavDropdown
        title={
          <>
            <Bell size={25} />
            <Badge bg='primary'>{notifications?.length ?? 0}</Badge>
          </>
        }
        drop='down'
        className='remove-arrow '
        align='end'>
        <NavDropdown.Header>notifications</NavDropdown.Header>
        <NavDropdown.Divider />

        <div>
          <NavDropdown.Item>
            <ul>
              {notifications?.map((notification, index) =>
                notification.type === 'friendRequest' ? (
                  <li key={index}>
                    <div>
                      <LinkContainer
                        to={`/userPage/${notification?.friendRequestId?.requesterId?._id}`}>
                        <div className='d-flex gap-3 align-items-center'>
                          <Image
                            src={`http://localhost:5000/${notification?.friendRequestId?.requesterId?._id}/profilePictures/${notification?.friendRequestId?.requesterId?.profileImage}`}
                            alt={
                              loggedInUser.gender === 'Male'
                                ? defMaleImg
                                : loggedInUser.gender === 'Female'
                                ? defFemaleImg
                                : defImg
                            }
                            style={{
                              width: '50px',
                              height: '50px',
                              objectFit: 'cover',
                              cursor: 'pointer',
                            }}
                            roundedCircle
                          />
                          <p>
                            <strong>
                              {notification?.friendRequestId?.requesterName ??
                                ''}
                              , {''}
                            </strong>
                            sent you a friend request
                          </p>
                          <AcceptRequestBtn userInfo={loggedInUser} />
                          <Button
                            variant='outline-danger'
                            size='sm'>
                            Reject
                          </Button>
                        </div>
                      </LinkContainer>
                    </div>
                  </li>
                ) : notification.type === 'post' ? (
                  <li key={index}>
                    <div>
                      <LinkContainer
                        to={`/userPage/${notification?.friendRequestId?.requesterId?._id}`}>
                        <div className='d-flex gap-3 align-items-center'>
                          <Image
                            src={`http://localhost:5000/${notification?.friendRequestId?.requesterId?._id}/profilePictures/${notification?.friendRequestId?.requesterId?.profileImage}`}
                            alt={
                              loggedInUser.gender === 'Male'
                                ? defMaleImg
                                : loggedInUser.gender === 'Female'
                                ? defFemaleImg
                                : defImg
                            }
                            style={{
                              width: '50px',
                              height: '50px',
                              objectFit: 'cover',
                              cursor: 'pointer',
                            }}
                            roundedCircle
                          />
                          <p>
                            <strong>
                              {notification?.friendRequestId?.requesterName ??
                                ''}
                              , {''}
                            </strong>
                            Posted
                          </p>
                        </div>
                      </LinkContainer>
                    </div>
                  </li>
                ) : notification.type === 'comment' ? (
                  <li key={index}>
                    <div>
                      <LinkContainer
                        to={`/userPage/${notification?.commentId?.commentedById?._id}`}>
                        <div className='d-flex gap-3 align-items-center'>
                          <Image
                            src={`http://localhost:5000/${notification?.commentId?.commentedById?._id}/profilePictures/${notification?.commentId?.commentedById?.profileImage}`}
                            alt={
                              loggedInUser.gender === 'Male'
                                ? defMaleImg
                                : loggedInUser.gender === 'Female'
                                ? defFemaleImg
                                : defImg
                            }
                            style={{
                              width: '50px',
                              height: '50px',
                              objectFit: 'cover',
                              cursor: 'pointer',
                            }}
                            roundedCircle
                          />
                          <p>
                            <strong>
                              {notification?.commentId?.commentedBy ?? ''}, {''}
                            </strong>
                            Commented
                          </p>
                        </div>
                      </LinkContainer>
                    </div>
                  </li>
                ) : null,
              )}
            </ul>
          </NavDropdown.Item>
        </div>
      </NavDropdown>
    </>
  );
};

export default Notifications;
