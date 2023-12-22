import PropTypes from 'prop-types';
import { Image, Modal, Button } from 'react-bootstrap';
import LoadingSpinner from '../loading/LoadingSpinner';
import { useEffect, useState } from 'react';
import { useGetSpecificUploadsByIdQuery } from '../../states/slices/uploads/apiUploadsEndpoints';
import { PersonAdd, Chat } from 'react-bootstrap-icons';

const UserProfileHeader = ({ userData, userInfo }) => {
  const [imgData, setImgData] = useState();

  const userName = `${userData?.fname} ${userData?.mname} ${userData?.lname}`;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const profileImage = userData && userData.profileImage;

  const { data } = useGetSpecificUploadsByIdQuery({ img: profileImage });

  useEffect(() => {
    setImgData(data && data.userPost);
  }),
    [data];

  return (
    <>
      {userData ? (
        <>
          <header className='d-flex align-items-center justify-content-center gap-3 p-5 bg-white-secondary'>
            <Image
              src={`http://localhost:5000/${userData?._id}/profilePictures/${profileImage}`}
              alt={userData?.fname}
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

              {String(userData._id) !== String(userInfo._id) && (
                <>
                  <Button variant='primary'>
                    <PersonAdd size={20} />
                    <small className='ms-1'>Add friend</small>
                  </Button>
                  <Button
                    variant='secondary'
                    className='ms-1'>
                    <Chat size={20} />
                    <small className='ms-1'>Reach</small>
                  </Button>
                </>
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
                  src={`http://localhost:5000/${userData?._id}/profilePictures/${userData?.profileImage}`}
                  alt={userData?.fname}
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
  userData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    fname: PropTypes.string.isRequired,
    mname: PropTypes.string,
    lname: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfileHeader;
