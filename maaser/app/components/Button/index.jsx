import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Button = ({ text, path, type, onClick }) => {
  return (
    <Link to={path} className={`btn ${type}`} onClick={onClick}>
      {text}
    </Link>
  );
};

Button.PropTypes = {
  text: PropTypes.string,
  path: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
