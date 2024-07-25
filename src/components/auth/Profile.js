import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{
      textAlign: 'center',  // Center-align text
      color: '#333',        // Set text color
      padding: '20px',      // Add padding around the content
    }}>
      <img
        src={user.picture}
        alt={user.name}
        style={{
          borderRadius: '50%',   // Make profile picture circular
          width: '100px',        // Set width of the profile picture
          height: '100px',       // Set height of the profile picture
          objectFit: 'cover',    // Ensure the image covers the area without distortion
          marginBottom: '10px',  // Add space below the profile picture
        }}
      />
      <h2 style={{
        fontSize: '24px',       // Set font size for the name
        margin: '10px 0',       // Add margin above and below the name
      }}>
        {user.name}
      </h2>
      <p style={{
        fontSize: '16px',       // Set font size for the email
        margin: '5px 0',        // Add margin above and below the email
      }}>
        {user.email}
      </p>
    </div>
  );
};

export default Profile;
