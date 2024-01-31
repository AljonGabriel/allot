import { Modal, Image, CloseButton } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import TimeAgo from '../../utils/TimeAgo';
import CommentField from './CommentField';
import { UserProfileImage } from '../userProfile/UserProfileImage';

const defMaleImg = 'http://localhost:5000/defaultImg/defaultMale.jpg';
const defFemaleImg = 'http://localhost:5000/defaultImg/defaultFemale.jpg';
const defImg = 'http://localhost:5000/defaultImg/Default.jpg';

const MoreCommentsModal = (props) => {
  return (
    <Modal
      {...props}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          {props.post && props.post.uploadedBy} Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '600px', overflow: 'auto' }}>
        {props.comment &&
          props.comment.map((userComment, index) => (
            <section
              key={userComment._id}
              className='my-1'>
              <div className='d-flex gap-3'>
                <Image
                  src={`http://localhost:5000/${userComment.commentedById._id}/profilePictures/${userComment.commentedById.profileImage}`}
                  alt={
                    props.userInfo.gender === 'Male'
                      ? defMaleImg
                      : props.userInfo.gender === 'Female'
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

                <div className='d-flex justify-content-between p-2 gap-3 rounded bg-white-secondary w-100'>
                  <div>
                    <LinkContainer
                      to={`/userPage/${userComment.commentedById._id}`}>
                      <div className='d-flex gap-2 align-items-center'>
                        <div>
                          <h5 className='m-0 p-0'>{userComment.commentedBy}</h5>
                        </div>
                      </div>
                    </LinkContainer>
                    <small className='text-muted white me-2'>
                      <TimeAgo date={userComment.createdAt} />
                    </small>
                    <div className=''>
                      <p className='comment mt-1'>{userComment.comment}</p>
                    </div>
                  </div>
                  <div>
                    {userComment.commentedById._id === props.userInfo._id && (
                      <CloseButton
                        style={{ fontSize: '0.8rem', padding: '0.2rem' }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </section>
          ))}
      </Modal.Body>
      <Modal.Body>
        <section className='d-flex align-items-center w-100'>
          <UserProfileImage />
          {props.showModalField && (
            <CommentField
              post={props.post}
              userInfo={props.userInfo}
            />
          )}
        </section>
      </Modal.Body>
    </Modal>
  );
};

export default MoreCommentsModal;
