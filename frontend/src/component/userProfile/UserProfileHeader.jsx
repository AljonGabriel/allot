import PropTypes from 'prop-types';
import { Image, Modal, Button, Stack } from 'react-bootstrap';
import LoadingSpinner from '../loading/LoadingSpinner';
import { useEffect, useState } from 'react';
import { useGetSpecificUploadsByIdQuery } from '../../states/slices/uploads/apiUploadsEndpoints';
import { Chat } from 'react-bootstrap-icons';
import FriendRequestBtn from '../friendRequestBtn/FriendRequestBtn';

const UserProfileHeader = ({ viewedUser, userInfo }) => {
  const viewed = viewedUser || '';
  const [imgData, setImgData] = useState();

  const userName = `${viewed?.fname} ${viewed?.mname} ${viewed?.lname}`;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const profileImage = viewed && viewed.profileImage;

  const { data } = useGetSpecificUploadsByIdQuery({ img: profileImage });

  useEffect(() => {
    setImgData(data && data.userPost);
  }),
    [data];

  return (
    <>
      {viewed ? (
        <>
          <header className='d-flex align-items-center justify-content-center gap-3 p-5 bg-white-secondary'>
            <Image
              src={`http://localhost:5000/${viewed?._id}/profilePictures/${profileImage}`}
              alt={viewed?.fname}
              onClick={handleShow}
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'cover',
                cursor: 'pointer',
              }}
              roundedCircle
              className=' border border-5 border-white shadow'
            />

            <div>
              <h3>{userName}</h3>
              <p className='text-muted '>Work title here</p>

              {String(viewed._id) !== String(userInfo._id) && (
                <Stack direction='horizontal'>
                  <FriendRequestBtn
                    viewedUser={viewedUser}
                    userInfo={userInfo}
                  />
                  <Button
                    variant='secondary'
                    className='ms-1'>
                    <Chat size={20} />
                    <small className='ms-1'>Reach</small>
                  </Button>
                </Stack>
              )}
            </div>

            <Modal
              size='md'
              show={show}
              onHide={handleClose}
              backdrop='static'
              keyboard={false}
              centered>
              <Modal.Header closeButton>
                <Modal.Title>{imgData && imgData.description}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Image
                  src={`http://localhost:5000/${viewed?._id}/profilePictures/${viewed?.profileImage}`}
                  alt={viewed?.fname}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Modal.Body>
            </Modal>
          </header>
        </>
      ) : (
        <section>
          <LoadingSpinner />
        </section>
      )}
    </>
  );
};

UserProfileHeader.propTypes = {
  viewedUser: PropTypes.shape({
    _id: PropTypes.string,
    fname: PropTypes.string,
    mname: PropTypes.string,
    lname: PropTypes.string,
    profileImage: PropTypes.string,
  }),
};

export default UserProfileHeader;
