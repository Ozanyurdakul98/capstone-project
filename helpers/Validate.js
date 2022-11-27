export function ValidateSignUp(form) {
  const errors = {};
  const patternEmail = /^([^\s@]+@[^\s@]+\.[^\s@]+$)$/i;
  const patternPassword = /^([a-zA-Z-0-9-!äöü#@.,-_]){8,60}$/i;
  const isMatch = form.password === form.matchpassword;
  if (!form.username) {
    errors.username = "A Username is required!";
  }
  if (!form.email) {
    errors.email = "A Email adress is required!";
  } else if (!patternEmail.test(form.email)) {
    errors.email = "Your Email format is invalid!";
  }
  if (!form.password) {
    errors.password = "Please enter password";
  } else if (!patternPassword.test(form.password)) {
    errors.password =
      "Incorrect format! Only (a-zA-Z-0-9-!äöü#@.,-_) and 8-20 characters";
  }
  if (!form.matchpassword) {
    errors.matchpassword = "Enter your Password again!";
  } else if (!isMatch) {
    errors.matchpassword = "Password is not matching!";
  }

  return errors;
}

export function ValidateEditUser(form) {
  const errors = {};
  const patternEmail = /^([^\s@]+@[^\s@]+\.[^\s@]+$)$/i;
  const nameRegex = /^([a-zA-Z-])([a-zA-Z-äöü_\s]){0,25}$/i;

  if (!nameRegex.test(form.name)) {
    errors.name = "Your name is not valid!";
  }
  if (!form.email) {
    errors.email = "Email adress is required!";
  } else if (!patternEmail.test(form.email)) {
    errors.email = "Email format is invalid!";
  }

  return errors;
}

export function ValidateCreateListing(form, checked) {
  const errors = {};
  const regex = /^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){9,60}$/i;
  const patternLocation = /^([a-zA-Z-])([a-zA-Z-0-9-,äöü\s]){4,60}$/i;

  if (!form.listingTitle) {
    errors.listingTitle = "A listing title is required!";
  } else if (!regex.test(form.listingTitle)) {
    errors.listingTitle = "Your input is not valid!";
  }

  if (
    checked.studioPricing.indexOf("studioPricingHour") > -1 &&
    !form.studioPricing.studioPricingHour
  ) {
    errors.studioPricing = "Enter your price!";
  } else if (form.studioPricing.studioPricingHour?.length >= 5) {
    errors.studioPricing = "The max length is 4 numbers";
  }

  if (
    checked.studioPricing.indexOf("studioPricingDay") > -1 &&
    !form.studioPricing.studioPricingDay
  ) {
    errors.studioPricing = "Enter your price!";
  } else if (form.studioPricing.studioPricingDay?.length >= 5) {
    errors.studioPricing = "The max length is 4 numbers";
  }

  if (
    checked.studioPricing.indexOf("studioPricingWeek") > -1 &&
    !form.studioPricing.studioPricingWeek
  ) {
    errors.studioPricing = "Enter your price!";
  } else if (form.studioPricing.studioPricingWeek?.length >= 5) {
    errors.studioPricing = "The max length is 4 numbers";
  }

  if (
    checked.studioPricing.indexOf("studioPricingMonth") > -1 &&
    !form.studioPricing.studioPricingMonth
  ) {
    errors.studioPricing = "Enter your price!";
  } else if (form.studioPricing.studioPricingMonth?.length >= 5) {
    errors.studioPricing = "The max length is 4 numbers";
  }

  if (form.services.length === 0) {
    errors.services = "Select at least 1 service!";
  }

  if (
    Object.keys(form.studioPricing).length === 0 &&
    form.studioPricing.constructor === Object
  ) {
    errors.studioPricing = "Select at least 1 studio pricing option!";
  }

  if (form.locationFeatures.length === 0) {
    errors.locationFeatures = "Select at least 1 location feature!";
  }

  if (!form.soundengineer) {
    errors.soundengineer = "Select a option for Soundengineer!";
  } else if (form.soundengineer.soundengineerPrice?.length >= 5) {
    errors.soundengineer = "The max length is 4 numbers";
  }

  if (!form.studioLocation) {
    errors.studioLocation = "A studio location is required!";
  } else if (!patternLocation.test(form.studioLocation)) {
    errors.studioLocation = "Your input is not valid";
  }
  return errors;
}
