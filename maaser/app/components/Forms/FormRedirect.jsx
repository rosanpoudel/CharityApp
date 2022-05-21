import React from 'react';
import { Link } from 'react-router-dom';

const FormRedirect = ({ text, link, linkText }) => {
  return (
    <div className="redirect">
      {text}
      <Link className="redirect-link" to={link}>
        {linkText}
      </Link>
    </div>
  );
};

export default FormRedirect;
