import React, { useState, useEffect } from 'react';
import InputFeild from '../../components/Forms/InputFeild';
import SubmitBtn from '../../components/Forms/SubmitBtn';

// proto
import AccountProto from '../../protos/account_pb';

const ChangePassword = ({
  oldPassword,
  newPassword,
  loading,
  setOldPassword,
  setNewPassword,
  changePassword,
}) => {
  // states
  const [oldPasswordToggle, setOldPasswordToggle] = useState(true);
  const [newPasswordToggle, setNewPasswordToggle] = useState(true);
  const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  //   change submit
  function changePasswordSubmit(e) {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      const passwordProto = new AccountProto.PasswordChangeRequest();
      passwordProto.setOldpassword(oldPassword);
      passwordProto.setNewpassword(newPassword);
      changePassword(passwordProto);
    }
  }

  useEffect(() => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }, [loading]);

  return (
    <>
      <div className="centerAll" style={{ minHeight: '75vh' }}>
        <div className="change-password-wrap">
          <h2 className="c-text title">Change Password</h2>
          <form className="c-form" onSubmit={changePasswordSubmit}>
            {/* old password */}
            <InputFeild
              className={passwordError ? 'form-row  has-error' : 'form-row'}
              labelFor="oldpassword"
              label="Current Password"
              name="oldpassword"
              id="oldpassword"
              type={oldPasswordToggle ? 'password' : 'text'}
              required="required"
              showPassword={() => {
                setOldPasswordToggle(!oldPasswordToggle);
              }}
              eye
              onChange={e => {
                setOldPassword(e.target.value);
              }}
              value={oldPassword}
            />

            {/* new password */}
            <InputFeild
              className={passwordError ? 'form-row  has-error' : 'form-row'}
              labelFor="password"
              label="New Password"
              name="password"
              id="password"
              type={newPasswordToggle ? 'password' : 'text'}
              required="required"
              showPassword={() => {
                setNewPasswordToggle(!newPasswordToggle);
              }}
              eye
              inputError
              errorMsg="*password must be atleast 6 digits"
              onChange={e => {
                if (e.target.value.length < 6) {
                  setPasswordError(true);
                } else {
                  setPasswordError(false);
                }
                setNewPassword(e.target.value);
              }}
              value={newPassword}
            />

            {/* confirm password */}
            <InputFeild
              className={
                confirmPasswordError
                  ? 'form-row last has-error'
                  : 'form-row last'
              }
              labelFor="confirmPassword"
              label="confirmPassword"
              name="confirmPassword"
              id="confirmPassword"
              type={confirmPasswordToggle ? 'password' : 'text'}
              required="required"
              showPassword={() => {
                setConfirmPasswordToggle(!confirmPasswordToggle);
              }}
              eye
              inputError
              errorMsg="*passwords do not match"
              onChange={e => {
                setConfirmPassword(e.target.value);
                if (newPassword !== e.target.value) {
                  setConfirmPasswordError(true);
                } else {
                  setConfirmPasswordError(false);
                }
              }}
              value={confirmPassword}
            />
            <SubmitBtn value="Change" loading={loading} />
          </form>
        </div>
      </div>
    </>
  );
};
export default ChangePassword;
