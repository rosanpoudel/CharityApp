import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Logo from '../../components/Logo';
import FormTitle from '../../components/Forms/FormTitle';
import FormDescription from '../../components/Forms/FormDescription';
import SubmitBtn from '../../components/Forms/SubmitBtn';
import InputFeild from '../../components/Forms/InputFeild';
import { EmailPhoneValidator } from '../../utils/helpers/ValidationHelpers';

const ForgotPassword = ({
  onChangeEmailPhone,
  sendEmailPhone,

  // state values
  emailPhone,
  loading,
}) => {
  const [emailPhoneError, setEmailPhoneError] = useState(false);

  // handle change
  function handleChange(e) {
    onChangeEmailPhone(e.target.value);
    EmailPhoneValidator(e.target.value, setEmailPhoneError);
  }

  // handle submit
  const handleForgotPasswordSubmit = e => {
    e.preventDefault();
    sendEmailPhone();
  };
  return (
    <div className="forgot-password-page bg-hands bg-hand-2">
      <div className="white-bg-wrap">
        <Logo />
        <FormTitle title="Forgot Password" />
        <FormDescription
          description="Enter your email address or phone number and we’ll send you
          instructions on how to change your password."
        />

        {/* forgot password form */}
        <form
          className="c-form forgot-password-form"
          onSubmit={handleForgotPasswordSubmit}
        >
          {/* email / phone number */}
          <InputFeild
            className={
              emailPhoneError ? 'form-row last has-error ' : 'form-row last'
            }
            labelFor="emailPhone"
            label="Email/Phone"
            name="emailPhone"
            id="emailPhone"
            type="text"
            onChange={handleChange}
            required="required"
            value={emailPhone}
            inputError
            errorMsg="*invalid email address or phone number"
          />

          {/* submit button */}
          <SubmitBtn value="Send" loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
