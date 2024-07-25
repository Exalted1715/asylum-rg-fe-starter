import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Navigation = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <nav>
      {isAuthenticated && <Link to="/profile">Profile</Link>}
    </nav>
  );
};

export default Navigation;
