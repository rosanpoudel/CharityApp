import React from 'react';
import { Link } from 'react-router-dom';

const PublicNavbar = () => {
  return (
    <div className="navigation-bar public-navbar">
      <div className="btns">
        <Link to="/login" className="btn btnPrimary">
          Login
        </Link>
        <Link to="/" className="btn btnSecondary">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default PublicNavbar;
