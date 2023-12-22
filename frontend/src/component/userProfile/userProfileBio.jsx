import LoadingSpinner from '../loading/LoadingSpinner';
import { Button } from 'react-bootstrap';
import './userProfileBio.css';

const UserProfileBio = ({ userData }) => {
  const calculateAge = (birthdate) => {
    const birthDateObj = new Date(birthdate);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDateObj.getFullYear();

    // Check if the birthday has occurred this year
    if (
      currentDate.getMonth() < birthDateObj.getMonth() ||
      (currentDate.getMonth() === birthDateObj.getMonth() &&
        currentDate.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  const formattedBirthdate =
    userData && userData.birthdate
      ? new Date(userData.birthdate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '';

  const age = calculateAge(formattedBirthdate);

  console.log(age); // This will log the calculated age

  return (
    <section
      className=' bg-white rounded p-3 border'
      style={{ minHeight: '200px', flex: '1' }}>
      {userData ? (
        <>
          <h2 className='pb-3'>Intro</h2>
          <hr />
          <div className='info-item'>
            <span className='label'>Gender:</span>
            <span className='value'>{userData.gender}</span>
          </div>
          <div className='info-item'>
            <span className='label'>Birthday:</span>
            <span className='value'>{formattedBirthdate}</span>
          </div>
          <div className='info-item'>
            <span className='label'>Age:</span>
            <span className='value'>{age}</span>
          </div>
          <div className='info-item'>
            <span className='label'>E-mail:</span>
            <span className='value'>{userData.email}</span>
          </div>
          <Button
            variant='outline-secondary'
            className='mt-3 w-100'>
            Add more detail
          </Button>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </section>
  );
};

export default UserProfileBio;
