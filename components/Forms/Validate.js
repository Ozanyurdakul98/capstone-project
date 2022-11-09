export function ValidateSignUp(form) {
  const errors = {};
  const patternEmail = /^([^\s@]+@[^\s@]+\.[^\s@]+$)$/i;
  const patternPassword = /^([a-zA-Z-0-9-!äöü#@.,-_]){8,60}$/i;
  const isMatch = form.password === form.matchpassword;

  if (!form.email) {
    errors.email = 'A Email adress is required!';
  } else if (!patternEmail.test(form.email)) {
    errors.email = 'Your Email format is invalid!';
  }
  if (!form.password) {
    errors.password = 'Please enter password';
  } else if (!patternPassword.test(form.password)) {
    errors.password = 'Incorrect format! Only (a-zA-Z-0-9-!äöü#@.,-_) and 8-20 characters';
  }
  if (!form.matchpassword) {
    errors.matchpassword = 'Enter your Password again!';
  } else if (!isMatch) {
    errors.matchpassword = 'Password Incorrect.';
  }

  return errors;
}
