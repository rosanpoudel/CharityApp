import React, { useState } from 'react';
import Logo from '../../components/Logo';
import FormTitle from '../../components/Forms/FormTitle';
import FormDescription from '../../components/Forms/FormDescription';
import SubmitBtn from '../../components/Forms/SubmitBtn';
import FormRedirect from '../../components/Forms/FormRedirect';

// protos
import VerificationProto from '../../protos/account_pb';

const PasswordVerification = ({
  onChangeVerificationCode,
  postVerificationCode,
  refId,
  loading,
  resendCode,
}) => {
  const [verificationCode, setVerificationCode] = useState({
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  });

  // handle change and move to next tab
  const handleChange = e => {
    const { maxLength, value, name } = e.target;
    const [fieldName, fieldIndex] = name.split('-');

    // Check if they hit the max character length
    if (value.length >= maxLength) {
      // Check if it's not the last input field
      if (parseInt(fieldIndex, 10) < 6) {
        // Get the next input field
        const nextSibling = document.querySelector(
          `input[name=code-${parseInt(fieldIndex, 10) + 1}]`,
        );

        // If found, focus the next field
        if (nextSibling !== null) {
          nextSibling.focus();
        }
      }
    }

    setVerificationCode({ ...verificationCode, [e.target.id]: e.target.value });
  };

  // code altogether
  const code = Object.values(verificationCode).join('');
  onChangeVerificationCode(code);

  // handle submit
  const handleVerificationSubmit = e => {
    e.preventDefault();
    // setting proto
    const verificationData = new VerificationProto.AccountVerification();
    verificationData.setRefid(refId);
    verificationData.setCode(code);
    postVerificationCode(verificationData);
  };

  return (
    <div className="password-verification-page bg-hands bg-hand-2">
      <div className="white-bg-wrap">
        <Logo />
        <FormTitle title="Verification" />
        <FormDescription description=" Enter the verification code that we just sent on your email." />
        {/* password verification form */}
        <form
          className="c-form password-verification-form"
          onSubmit={handleVerificationSubmit}
        >
          {/* verification code */}
          <div className="form-row last">
            <input
              className="form-input"
              type="text"
              maxLength="1"
              name="code-1"
              id="code1"
              onChange={handleChange}
              required
            />
            <input
              className="form-input"
              type="text"
              maxLength="1"
              id="code2"
              name="code-2"
              onChange={handleChange}
              required
            />
            <input
              className="form-input"
              type="text"
              maxLength="1"
              id="code3"
              name="code-3"
              onChange={handleChange}
              required
            />
            <input
              className="form-input"
              type="text"
              maxLength="1"
              id="code4"
              name="code-4"
              onChange={handleChange}
              required
            />
            <input
              className="form-input"
              type="text"
              maxLength="1"
              id="code5"
              name="code-5"
              onChange={handleChange}
              required
            />
            <input
              className="form-input"
              type="text"
              maxLength="1"
              id="code6"
              name="code-6"
              onChange={handleChange}
              required
            />
          </div>

          {/* submit button */}
          <SubmitBtn value="Send" loading={loading} />
        </form>
        {/* redirect */}
        <div className="redirect">
          If you didn’t receive a code !
          <p className="redirect-link" onClick={() => resendCode()}>
            Resend
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordVerification;
