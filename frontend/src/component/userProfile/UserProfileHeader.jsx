import PropTypes from 'prop-types';
import { Image, Modal } from 'react-bootstrap';
import LoadingSpinner from '../loading/LoadingSpinner';
import { useEffect, useState } from 'react';
import { useGetSpecificUploadsByIdQuery } from '../../states/slices/uploads/apiUploadsEndpoints';

const UserProfileHeader = ({ userData, uploadData }) => {
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

  console.log(data && data.userPost);

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
            <div className=''>
              <h3>{profileImage.description}</h3>
            </div>
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
