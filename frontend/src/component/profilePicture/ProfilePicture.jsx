import { Form, Button } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useUploadProfilePicMutation } from '../../states/slices/users/usersApiSlice.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileImage } from '../../states/slices/users/authSlice.js';

import defBoyImg from './../../assets/defaultImg/DefaultBoy.jpg';
import defGirlImg from './../../assets/defaultImg/DefaultGirl.jpg';
import defImg from './../../assets/defaultImg/Default.jpg';

const ProfilePicture = () => {
  const [profileUpload, { isLoading }] = useUploadProfilePicMutation();
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const handlesSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedFile); // Use 'file' instead of 'formData'

    try {
      const res = await profileUpload(formData).unwrap();
      dispatch(updateProfileImage(res));
      console.log(res);
      navigate('/home');
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (event) => {
    // Update the selected file when the input changes
    setSelectedFile(event.target.files[0]);
  };
  return (
    <>
      <section className='bg-white p-5 border border-white-secondary rounded-3'>
        <Form
          className='text-center'
          onSubmit={(e) => handlesSubmit(e)}>
          <Image
            src={
              userInfo.gender === 'Male'
                ? defBoyImg
                : userInfo.gender === 'Female'
                ? defGirlImg
                : defImg
            }
            alt={
              userInfo.gender === 'Male'
                ? defBoyImg
                : userInfo.gender === 'Female'
                ? defGirlImg
                : defImg
            }
            style={{ width: '150px', height: '150px' }}
            roundedCircle
            className='m-auto'
          />
          <Form.Group>
            <Form.Label>Add profile picture</Form.Label>

            <Form.Control
              type='file'
              accept='image/*'
              onChange={handleFileChange}
            />
            <Button
              variant='primary'
              type='submit'
              className='my-3 w-100'>
              Upload
            </Button>
          </Form.Group>
        </Form>
        <Link
          className='btn btn-outline-secondary w-100'
          to='/home'>
          Skip
        </Link>
      </section>
    </>
  );
};

export default ProfilePicture;
