import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd'; // Assuming you're using Ant Design for buttons

const AuthButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Button
      onClick={() => {
        if (isAuthenticated) {
          logout({ returnTo: window.location.origin });
        } else {
          loginWithRedirect();
        }
      }}
      style={{
        backgroundColor: 'lightgray',
        color: 'black',
        borderRadius: '50%',
        width: '0.85in',
        height: '0.75in',
        display: 'flex',          // Use flexbox for centering
        alignItems: 'center',    // Vertically center content
        justifyContent: 'center', // Horizontally center content
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',    // Relative positioning for adjustments
    top: '.60in', // Move down 
    left: '-1.55in', // Move left
    padding: 0,              // Remove default padding
    lineHeight: 'normal',    // Reset line height to default
      }}
    >
      {isAuthenticated ? 'Log Out' : 'Log In'}
    </Button>
  );
};

export default AuthButton;
