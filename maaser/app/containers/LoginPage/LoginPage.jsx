import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Logo from '../../components/Logo';
import { Link } from 'react-router-dom';
import FormTitle from '../../components/Forms/FormTitle';
import SubmitBtn from '../../components/Forms/SubmitBtn';
import FormRedirect from '../../components/Forms/FormRedirect';
import InputFeild from '../../components/Forms/InputFeild';
import { EmailPhoneValidator } from '../../utils/helpers/ValidationHelpers';

// proto
import LoginProto from '../../protos/auth_pb';

const LoginPage = ({
  onChangeEmailPhone,
  onChangePassword,
  login,
  // state
  emailPhone,
  password,
  loading,
  clearFormData,
}) => {
  const [passwordToggle, setPasswordToggle] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [emailPhoneError, setEmailPhoneError] = useState(false);

  //   handle submit
  function handleLoginSubmit(e) {
    e.preventDefault();
    const loginData = new LoginProto.LoginRequest();
    loginData.setEmailphone(emailPhone);
    loginData.setPassword(password);
    login(loginData);
  }

  useEffect(() => {
    clearFormData();
  }, []);

  return (
    <div className="login-page bg-hands bg-hand-2">
      <div className="white-bg-wrap">
        <Logo />
        <FormTitle title="Login Account" />

        {/* login form */}
        <form
          className="c-form login-form"
          // autoComplete="off"
          onSubmit={handleLoginSubmit}
        >
          {/* email / phone number */}
          <InputFeild
            className={emailPhoneError ? 'form-row has-error' : 'form-row '}
            labelFor="emailPhone"
            label="Email/Phone"
            name="emailPhone"
            id="emailPhone"
            type="text"
            onChange={e => {
              onChangeEmailPhone(e.target.value);
            }}
            value={emailPhone}
            required="required"
            inputError
            errorMsg="*invalid email address or phone number"
          />
          {/* password */}
          <InputFeild
            className="form-row"
            labelFor="password"
            label="password"
            name="password"
            id="password"
            type={passwordToggle ? 'password' : 'text'}
            onChange={e => {
              onChangePassword(e.target.value);
            }}
            value={password}
            showPassword={() => {
              setPasswordToggle(!passwordToggle);
            }}
            eye
            inputError
            errorMsg="*must me at least 6 characters"
          />
          {/* remember me */}
          <div className="form-row credentials">
            <div className="remember-me">
              <input type="checkbox" />
              Remember me
            </div>
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </div>
          {/* submit button */}
          <SubmitBtn value="Login" loading={loading} />
        </form>

        {/* redirect */}
        <FormRedirect
          text="Don't have an account?"
          link="/"
          linkText="Sign up"
        />
      </div>
    </div>
  );
};

LoginPage.PropTypes = {
  onChangeEmailPhone: PropTypes.func,
  onChangePassword: PropTypes.func,
  login: PropTypes.func,
  emailPhone: PropTypes.string,
  password: PropTypes.string,
  loading: PropTypes.bool,
};

export default LoginPage;
