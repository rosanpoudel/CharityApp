import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Logo from '../../components/Logo';
import FormTitle from '../../components/Forms/FormTitle';
import SubmitBtn from '../../components/Forms/SubmitBtn';
import FormRedirect from '../../components/Forms/FormRedirect';
import InputFeild from '../../components/Forms/InputFeild';
import { EmailPhoneValidator } from '../../utils/helpers/ValidationHelpers';
import { Select } from 'antd';
const { Option } = Select;
import CountrySelect from '../../components/CountrySelect';

// protos
import AccountProto from '../../protos/account_pb';
import MaaserProto from '../../protos/maaser_pb';

const RegisterPage = ({
  onChangeClientType,
  onChangeCountry,
  onChangeEmailPhone,
  onChangePassword,
  register,
  clearFormData,

  // form values from store
  clientType,
  accountType,
  country,
  emailPhone,
  password,
  loading,
}) => {
  // states
  const [passwordToggle, setPasswordToggle] = useState(true);
  const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(true);
  const [clientTypeError, setClientTypeError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [emailPhoneError, setEmailPhoneError] = useState(false);

  // confirm password
  const [confirmPassword, setConfirmPassword] = useState('');

  // handle clienttype change
  function handleClientTypeChange(value) {
    onChangeClientType(value);
    setClientTypeError(false);
  }

  // handle emailphone change
  function handleEmailPhoneChange(e) {
    onChangeEmailPhone(e.target.value);
    EmailPhoneValidator(e.target.value, setEmailPhoneError);
    if (clientType === '') {
      setClientTypeError(true);
    }
  }

  // handle password change
  function handlePasswordChange(e) {
    onChangePassword(e.target.value);
    if (country === '') {
      setCountryError(true);
    }
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
  function showPassword() {
    setPasswordToggle(!passwordToggle);
  }

  // for confirm password show hide
  function confirmShowPassword() {
    setConfirmPasswordToggle(!confirmPasswordToggle);
  }

  // select search country
  function getCountryCode(value) {
    onChangeCountry(value);
    setCountryError(false);
  }

  // form submit
  function handleRegisterSubmit(e) {
    e.preventDefault();
    if (country !== '' && accountType !== '' && password === confirmPassword) {
      const accountData = new AccountProto.Account();
      const clientData = new AccountProto.Client();
      accountData.setEmail(emailPhone);
      accountData.setPassword(password);
      accountData.setCountrycode(country);
      accountData.setAccountstatus(2); //verified
      accountData.setAccounttype(accountType);
      clientData.setClienttype(clientType);
      clientData.setAccount(accountData);
      register(clientData);
    }
  }

  useEffect(() => {
    clearFormData();
  }, []);

  return (
    <div className="register-page bg-hands bg-hand-1">
      <div className="white-bg-wrap">
        <Logo />
        <FormTitle title="Create New Account" />
        {/* register form */}
        <form
          className="c-form register-form"
          onSubmit={handleRegisterSubmit}
          autoComplete="off"
        >
          {/* type */}
          <div className="form-row form-select">
            <label className="form-label" htmlFor="clientType">
              choose account type
            </label>
            <Select
              className="form-input select"
              name="clientType"
              id="clientType"
              value={clientType}
              onChange={handleClientTypeChange}
              required="required"
              bordered={false}
            >
              <Option value={1}>Individual</Option>
              <Option value={2}>Organization</Option>
            </Select>
            {clientTypeError ? (
              <p className="error-msg">*please select a value</p>
            ) : (
              ''
            )}
          </div>

          {/* email / phone number */}
          <InputFeild
            className={emailPhoneError ? 'form-row has-error' : 'form-row '}
            labelFor="emailPhone"
            label="Email/Phone"
            name="emailPhone"
            id="emailPhone"
            type="text"
            onChange={handleEmailPhoneChange}
            value={emailPhone}
            required="required"
            inputError
            errorMsg="*invalid email address or phone number"
          />

          {/* country */}
          <CountrySelect
            getCountryCode={getCountryCode}
            countryError={countryError}
          />

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
            errorMsg="*password must be atleast 6 digits"
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
            showPassword={confirmShowPassword}
            eye
            inputError
            errorMsg="*passwords do not match"
          />

          {/* submit button */}
          <SubmitBtn value="Sign Up" loading={loading} />
        </form>

        {/* redirect */}
        <FormRedirect
          link="/login"
          text="Already have an account?"
          linkText="Login"
        />
      </div>
    </div>
  );
};

RegisterPage.PropTypes = {
  onChangeClientType: PropTypes.func,
  onChangeCountry: PropTypes.func,
  onChangeEmailPhone: PropTypes.func,
  onChangePassword: PropTypes.func,
  register: PropTypes.func,
  clientType: PropTypes.string,
  accountType: PropTypes.string,
  country: PropTypes.string,
  emailPhone: PropTypes.string,
  password: PropTypes.string,
  loading: PropTypes.bool,
};

export default RegisterPage;
