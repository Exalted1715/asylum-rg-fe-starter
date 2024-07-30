import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd'; // using Ant Design for buttons

const AuthButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div style={{ textAlign: 'right', marginTop: '0.5in', marginRight: '20px' }}>
      <Button
        onClick={() => {
          if (isAuthenticated) {
            logout({ returnTo: window.location.origin });
          } else {
            loginWithRedirect();
          }
        }}
        style={{
          backgroundColor: 'grey',
          color: 'white',
          borderRadius: '4px',
          padding: '10px 20px',
          fontWeight: 'bold',
          fontFamily: 'Arial, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '0.5in',
          height: '50px', // Adjust height as needed
        }}
      >
        {isAuthenticated ? 'Log Out' : 'Log In'}
      </Button>
    </div>
  );
};

export default AuthButton;
