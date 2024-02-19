import { NavDropdown, Image, Button, Badge } from 'react-bootstrap';

import { Bell } from 'react-bootstrap-icons';

import { LinkContainer } from 'react-router-bootstrap';

import AcceptRequestBtn from '../acceptRequestBtn/AcceptRequestBtn';
import { useFetchNotificationQuery } from '../../states/slices/notifications/apiNotificationEndpoints';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../loading/LoadingSpinner';
import { useSelector } from 'react-redux';
import TimeAgo from '../../utils/TimeAgo';

const defMaleImg = 'http://localhost:5000/defaultImg/defaultMale.jpg';
const defFemaleImg = 'http://localhost:5000/defaultImg/defaultFemale.jpg';
const defImg = 'http://localhost:5000/defaultImg/Default.jpg';

const Notifications = (props) => {
  const [notifications, setNotification] = useState(null);

  const loggedInUser = props.userInfo;
  const loggedInUserId = loggedInUser._id;

  console.log(loggedInUserId);

  const { data, isLoading, refetch } = useFetchNotificationQuery({
    feLoggedInUserId: loggedInUserId,
  });

  const { notificationAction } = useSelector((state) => state.notifications);

  useEffect(() => {
    setNotification(data);
  }, [data, notificationAction]);

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
        <NavDropdown.Header>Notifications</NavDropdown.Header>
        <NavDropdown.Divider />

        <section>
          {notifications && notifications.length > 0 ? (
            <ul>
              {notifications.map((notification, index) => (
                <li key={index}>
                  <NavDropdown.Item>
                    {notification.type === 'friendRequest' &&
                    notification.friendRequestId ? (
                      <div
                        onClick={(e) => {
                          // Prevent the click event from reaching the dropdown container
                          e.stopPropagation();
                        }}>
                        <div className='p-3 my-1'>
                          <LinkContainer
                            to={`/userPage/${notification.friendRequestId.requesterId._id}`}>
                            <div className='d-flex align-items-center gap-3'>
                              <Image
                                src={`http://localhost:5000/${notification.friendRequestId.requesterId._id}/profilePictures/${notification.friendRequestId.requesterId.profileImage}`}
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

                              <div>
                                <strong>
                                  {' '}
                                  {notification.friendRequestId.requesterName}
                                </strong>
                                <small>
                                  , sent you a friend request <br />
                                  <TimeAgo
                                    date={
                                      notification.friendRequestId.createdAt
                                    }
                                  />
                                </small>
                              </div>
                            </div>
                          </LinkContainer>
                          <div className='w-100 mt-3'>
                            <AcceptRequestBtn
                              userInfo={props.userInfo}
                              index={index}
                              notifications={notifications}
                              refetch={refetch}
                            />
                            <Button
                              variant='outline-danger'
                              className='mx-1'
                              size='md'>
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : notification.type === 'post' && notification.postId ? (
                      <small>{notification.postId.uploadedBy}</small>
                    ) : notification.type === 'comment' &&
                      notification.commentId ? (
                      <div
                        onClick={(e) => {
                          // Prevent the click event from reaching the dropdown container
                          e.stopPropagation();
                        }}>
                        <div className='p-3 my-1'>
                          <LinkContainer
                            to={`/userPage/${notification.commentId.commentedById._id}`}>
                            <div className='d-flex align-items-center gap-3'>
                              <Image
                                src={`http://localhost:5000/${notification.commentId.commentedById._id}/profilePictures/${notification.commentId.commentedById.profileImage}`}
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

                              <div>
                                <strong>
                                  {' '}
                                  {notification.commentId.commentedBy}
                                </strong>
                                <small>
                                  , commented on your post <br />
                                  <TimeAgo
                                    date={notification.commentId.createdAt}
                                  />
                                </small>
                              </div>
                            </div>
                          </LinkContainer>
                        </div>
                      </div>
                    ) : null}
                  </NavDropdown.Item>
                </li>
              ))}
            </ul>
          ) : isLoading ? (
            <ul>
              <li>
                <LoadingSpinner />
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <small className='tex-ted'>No notification</small>
              </li>
            </ul>
          )}
        </section>
      </NavDropdown>
    </>
  );
};

export default Notifications;
