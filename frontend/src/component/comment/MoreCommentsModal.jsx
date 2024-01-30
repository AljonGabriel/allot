import { Button, Modal, Image, CloseButton } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import TimeAgo from '../../utils/TimeAgo';
import CommentField from './CommentField';

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
        <Modal.Title id='contained-modal-title-vcenter'>Comments </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '500px', overflow: 'auto' }}>
        {props.comment &&
          props.comment.map((userComment, index) => (
            <section
              key={index}
              className='p-2 gap-3 rounded bg-white-secondary my-1'>
              <CloseButton />
              <LinkContainer to={`/userPage/${userComment.commentedById._id}`}>
                <div className='d-flex gap-2 align-items-center'>
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
                  <div>
                    <h5 className='m-0 p-0'>{userComment.commentedBy}</h5>
                    <small className='text-muted white me-2'>
                      <TimeAgo date={userComment.createdAt} />
                    </small>
                  </div>
                </div>
              </LinkContainer>
              <div>
                <p className='comment mt-2'>{userComment.comment}</p>
              </div>
            </section>
          ))}
      </Modal.Body>
      <Modal.Body>
        <CommentField
          post={props.post}
          userInfo={props.userInfo}
          showField={props.showField}
        />
      </Modal.Body>
    </Modal>
  );
};

export default MoreCommentsModal;
