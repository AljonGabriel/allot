import { useCheckTokenQuery } from '../../states/slices/users/apiUsersEndpoints';

const PrivateRoute = ({ children }) => {
  const { data } = useCheckTokenQuery();
  console.log('Cookie value:', data);
  if (data) {
    // The cookie is present
    console.log('Cookie value:', data);
    // You can proceed with rendering the protected content
    return <>{children}</>;
  } else {
    // The cookie is not present
    console.log('Cookie is not present');
    // Redirect or handle unauthorized access (e.g., navigate to the login page)
    // For demonstration, we're just logging a message here
    return <>{'Not authorized, please log in'}</>;
  }
};

export default PrivateRoute;
