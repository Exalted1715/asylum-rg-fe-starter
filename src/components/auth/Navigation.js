import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Navigation = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <h1>
      {isAuthenticated && (
        <Link
          to="/profile"
          style={{
            color: 'rgb(226, 240, 247)',
            paddingRight: '75px',
            textDecoration: 'none',
            backgroundColor: 'transparent',
            outline: 'none',
            cursor: 'pointer',
            transition: 'color 0.3s',
            boxSizing: 'border-box',
            paddingLeft: '75px',
            fontSize: '14px',  // Shrinking font size by half
            fontFamily: 'AcuminProRegular'  // Adding font style
          }}
        >
          Profile
        </Link>
      )}
    </h1>
  );
};

export default Navigation;
