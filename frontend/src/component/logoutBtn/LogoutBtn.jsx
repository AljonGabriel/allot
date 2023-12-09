import { Button } from 'react-bootstrap';
import { useLogoutMutation } from '../../states/slices/users/apiUsersEndpoints.js';
import { logout } from '../../states/slices/users/authSlice.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../loading/LoadingSpinner.jsx';

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutAPI, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutAPI().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button
        variant='outline-danger'
        onClick={handleLogout}
        className='w-100'
        disabled={isLoading}>
        {isLoading ? <LoadingSpinner /> : 'Logout'}
      </Button>
    </>
  );
};

export default LogoutBtn;
