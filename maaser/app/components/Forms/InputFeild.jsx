import React from 'react';
import EyeClosed from '../../images/eye-closed.svg';
import EyeOpen from '../../images/eye-open.svg';

const InputFeild = ({
  className,
  labelFor,
  label,
  placeholder,
  name,
  id,
  type,
  required,
  onChange,
  onFocus,
  maxLength,
  value,
  eye,
  showPassword,
  inputError,
  errorMsg,
}) => {
  return (
    <div className={className}>
      {label && labelFor ? (
        <label className="form-label" htmlFor={labelFor}>
          {label}
        </label>
      ) : (
        ''
      )}

      <input
        className="form-input"
        name={name}
        id={id}
        type={type}
        onChange={onChange}
        onFocus={onFocus}
        value={value}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
      />

      {eye ? (
        <img
          className={type === 'password' ? 'eye' : 'eye eye-open'}
          src={type === 'password' ? EyeClosed : EyeOpen}
          alt=""
          onClick={showPassword}
        />
      ) : (
        ''
      )}
      {inputError ? <p className="error-msg">{errorMsg}</p> : ''}
    </div>
  );
};

export default InputFeild;
