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

export function ValidateCreateListing(form) {
  const errors = {};
  const regex = /^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_s]){9,60}$/i;
  const patternLocation = /^([a-zA-Z-])([a-zA-Z-0-9-,äöüs]){4,60}$/i;

  if (!form.listingTitle) {
    errors.listingTitle = 'A listing title is required!';
  } else if (!regex.test(form.listingTitle)) {
    errors.listingTitle = 'Your input is not valid!';
  }
  if (form.studioPricing.studioPricingHour?.length >= 5) {
    errors.studioPricing = 'The max length is 4 numbers';
  } else if (form.studioPricing.studioPricingDay?.length >= 5) {
    errors.studioPricing = 'The max length is 4 numbers';
  } else if (form.studioPricing.studioPricingWeek?.length >= 5) {
    errors.studioPricing = 'The max length is 4 numbers';
  } else if (form.studioPricing.studioPricingMonth?.length >= 5) {
    errors.studioPricing = 'The max length is 4 numbers';
  } else if (form.services.length === 0) {
    errors.services = 'Select at least 1 service!';
  }
  if (Object.keys(form.studioPricing).length === 0 && form.studioPricing.constructor === Object) {
    errors.studioPricing = 'Select at least 1 studio pricing option!';
  }
  if (form.locationFeatures.length === 0) {
    errors.locationFeatures = 'Select at least 1 location feature!';
  }
  if (!form.soundengineer) {
    errors.soundengineer = 'Select a option for Soundengineer!';
  } else if (form.soundengineer.soundengineerPrice?.length >= 5) {
    errors.soundengineer = 'The max length is 4 numbers';
  }
  if (!form.studioLocation) {
    errors.studioLocation = 'A studio location is required!';
  } else if (!patternLocation.test(form.studioLocation)) {
    errors.studioLocation = 'Your input is not valid';
  }
  return errors;
}
