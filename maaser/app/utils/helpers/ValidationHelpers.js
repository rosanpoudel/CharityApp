// email phone validator
export function EmailPhoneValidator(emailPhone, setEmailPhoneError) {
  let emailRegx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
  let phoneRegx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (emailRegx.test(emailPhone) === true || phoneRegx.test(emailPhone)) {
    setEmailPhoneError(false);
  } else {
    setEmailPhoneError(true);
  }
}
