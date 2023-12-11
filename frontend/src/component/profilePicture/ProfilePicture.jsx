import { Form, Button } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCreateProfilePicMutation } from '../../states/slices/uploads/apiUploadsEndpoints.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../loading/LoadingSpinner.jsx';
import { updateProfileImage } from '../../states/slices/users/authSlice.js';

const ProfilePicture = () => {
  const [profileUpload, { isLoading }] = useCreateProfilePicMutation();
  const [inputData, setInputData] = useState({
    fePostImages: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const handlesSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('pfImage', inputData.fePostImages); // Use 'file' instead of 'formData'

    try {
      const res = await profileUpload(formData).unwrap();
      // Assuming res.data.updatedProfile contains the profileImage property
      const profileImage = res.uploaded.images[0];

      // Dispatch the updateProfileImage action with the profileImage
      dispatch(updateProfileImage(profileImage));
      navigate('/home');

      console.log(profileImage);
    } catch (err) {
      console.log(err);
    }
  };

  const defMaleImg = 'http://localhost:5000/defaultImg/defaultMale.jpg';
  const defFemaleImg = 'http://localhost:5000/defaultImg/defaultFemale.jpg';
  const defImg = 'http://localhost:5000/defaultImg/default.jpg';

  return (
    <>
      <section className='bg-white p-5 border border-white-secondary rounded-3'>
        <Form
          className='text-center'
          onSubmit={(e) => handlesSubmit(e)}>
          <Image
            src={
              userInfo.gender === 'Male'
                ? defMaleImg
                : userInfo.gender === 'Female'
                ? defFemaleImg
                : defImg
            }
            alt={
              userInfo.gender === 'Male'
                ? 'Male Avatar'
                : userInfo.gender === 'Female'
                ? 'Female Avatar'
                : 'Default'
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
              onChange={(e) =>
                setInputData({
                  ...inputData,
                  fePostImages: e.target.files[0],
                })
              }
            />
            <Button
              variant='primary'
              type='submit'
              className='my-3 w-100'
              name='pfImage' // Ensure this matches the field name in the array
              disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : 'Upload'}
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
