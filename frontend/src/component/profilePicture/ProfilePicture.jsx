import { Form, Button } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCreateProfilePicMutation } from '../../states/slices/uploads/apiUploadsEndpoints.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../loading/LoadingSpinner.jsx';
import { updateProfileImage } from '../../states/slices/users/authSlice.js';

const ProfilePicture = () => {
  const [profileUpload, { isLoading }] = useCreateProfilePicMutation();
  const [inputData, setInputData] = useState({
    fePostImages: null,
    feDescription: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const handlesSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('pfImage', inputData.fePostImages);
      formData.append('feDescription', inputData.feDescription);

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

  // Assuming defMaleImg, defFemaleImg, and defImg are state variables
  /*   const defMaleImg = 'http://localhost:5000/defaultImg/defaultMale.jpg';
  const defFemaleImg = 'http://localhost:5000/defaultImg/defaultFemale.jpg'; */

  const [defImg, setDefImg] = useState('');

  useEffect(() => {
    if (userInfo.gender === 'Male') {
      setDefImg('http://localhost:5000/defaultImg/defaultMale.jpg');
    } else if (userInfo.gender === 'Female') {
      setDefImg('http://localhost:5000/defaultImg/defaultFemale.jpg');
    } else {
      setDefImg('http://localhost:5000/defaultImg/default.jpg');
    }
  }, [userInfo.gender]);

  const handleImageData = (e) => {
    // Assuming you want to update the default image based on the selected file
    const selectedFile = e.target.files[0];

    setInputData({ ...inputData, fePostImages: selectedFile });

    if (selectedFile) {
      // Assuming you are using FileReader to read the selected file
      const reader = new FileReader();

      reader.onloadend = () => {
        const newImageUrl = reader.result;
        // Update the default image state based on the selected file
        setDefImg(newImageUrl);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  console.log(inputData);

  return (
    <>
      <section className='bg-white p-5 border border-white-secondary rounded-3'>
        <Form
          className='text-center'
          onSubmit={(e) => handlesSubmit(e)}>
          <Image
            src={defImg}
            alt='Default Image'
            style={{ width: '150px', height: '150px' }}
            roundedCircle
            className='m-auto'
          />
          <Form.Group>
            <Form.Label>Add profile picture</Form.Label>

            <Form.Control
              type='file'
              accept='image/*'
              onChange={handleImageData}
            />

            <Form.Control
              type='text'
              as='textarea'
              className='mt-3'
              value={inputData.feDescription}
              placeholder='Description'
              onChange={(e) =>
                setInputData({ ...inputData, feDescription: e.target.value })
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
