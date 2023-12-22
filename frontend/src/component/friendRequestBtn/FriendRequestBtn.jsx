import { Button } from 'react-bootstrap';
import { PersonAdd } from 'react-bootstrap-icons';

const FriendRequestBtn = ({ viewedUser }) => {
  const handleClick = (e) => {
    e.preventDefault();

    console.log('click');
  };
  return (
    <Button
      variant='primary'
      onClick={(e) => handleClick(e)}>
      <PersonAdd size={20} />
      <small className='ms-1'>Add friend</small>
    </Button>
  );
};

export default FriendRequestBtn;
