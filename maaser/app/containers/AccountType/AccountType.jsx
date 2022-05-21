import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import history from '../../utils/history';

const AccountType = ({ onDonorClick, onReceiverClick }) => {
  return (
    <div className="home-page bg-hands bg-hand-1">
      <div className="white-bg-wrap">
        <Logo />
        <Button
          path="/signup"
          type="btnPrimary"
          text="sign up as donor"
          onClick={() => onDonorClick(2)}
        />
        <div className="divide">OR</div>
        <Button
          path="/signup"
          type="btnSecondary"
          text="sign up as receiver"
          onClick={() => {
            onReceiverClick(3);
          }}
        />
        <div className="redirect">
          Already have an account?
          <Link className="redirect-link" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

AccountType.PropTypes = {
  onDonorClick: PropTypes.func,
  onReceiverClick: PropTypes.func,
};

export default AccountType;
