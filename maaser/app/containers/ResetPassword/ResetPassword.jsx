import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Logo from '../../components/Logo';
import FormTitle from '../../components/Forms/FormTitle';
import FormDescription from '../../components/Forms/FormDescription';
import SubmitBtn from '../../components/Forms/SubmitBtn';
import FormRedirect from '../../components/Forms/FormRedirect';
import InputFeild from '../../components/Forms/InputFeild';

// protp
import AccountProto from '../../protos/account_pb';

const ResetPassword = ({
  onChangeResetPassword,
  password,
  loading,
  refId,
  code,
  resetPassword,
}) => {
  const [passwordToggle, setPasswordToggle] = useState(true);
  const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  // state values
  const [confirmPassword, setConfirmPassword] = useState('');

  // handle password change
  function handlePasswordChange(e) {
    onChangeResetPassword(e.target.value);

    if (e.target.value.length < 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }

  // handle confirm password change
  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  }

  // for password show hide
  const showPassword = () => {
    setPasswordToggle(!passwordToggle);
  };

  // for confirm password show hide
  const showConfirmPassword = () => {
    setConfirmPasswordToggle(!confirmPasswordToggle);
  };

  //   form submit
  function handleResetSubmit(e) {
    e.preventDefault();
    const resetData = new AccountProto.PasswordReset();
    resetData.setNewpassword(password);
    resetData.setAccountid(refId);
    resetData.setCode(code);
    resetPassword(resetData);
  }

  return (
    <div className="reset-password-page bg-hands bg-hand-2">
      <div className="white-bg-wrap">
        <Logo />
        <FormTitle title="Create new Password" />
        <FormDescription description="Your new password must be different from previous used password." />

        {/* reset password form */}
        <form
          className="c-form reset-form"
          onSubmit={handleResetSubmit}
          autoComplete="off"
        >
          {/* password */}
          <InputFeild
            className={passwordError ? 'form-row  has-error' : 'form-row'}
            labelFor="password"
            label="password"
            name="password"
            id="password"
            type={passwordToggle ? 'password' : 'text'}
            onChange={handlePasswordChange}
            value={password}
            required="required"
            showPassword={showPassword}
            eye
            inputError
            errorMsg="*must me at least 6 characters"
          />

          {/* confirm password */}
          <InputFeild
            className={
              confirmPasswordError ? 'form-row last has-error' : 'form-row last'
            }
            labelFor="confirmPassword"
            label="confirmPassword"
            name="confirmPassword"
            id="confirmPassword"
            type={confirmPasswordToggle ? 'password' : 'text'}
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
            required="required"
            showPassword={showConfirmPassword}
            eye
            inputError
            errorMsg="*passwords do not match"
          />

          {/* submit button */}
          <SubmitBtn value="Send" loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
