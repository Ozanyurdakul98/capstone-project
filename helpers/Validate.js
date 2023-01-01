export function ValidateSignUp(form) {
  const errors = {};
  const patternEmail = /^([^\s@]+@[^\s@]+\.[^\s@]+$)$/i;
  const patternPassword = /^([a-zA-Z-0-9-!äöü#@.,-_]){8,60}$/i;
  const userName = /^[a-zA-Z][a-zA-Z0-9-_]{4,19}/;
  const isMatch = form.password === form.matchpassword;

  if (!form.username) {
    errors.username = 'A Username is required!';
  } else if (!userName.test(form.userName)) {
    errors.username = 'Your username format is invalid!';
  } else if (form.userName.length >= 21) {
    errors.username = 'Your username is too long!';
  }
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
    errors.matchpassword = 'Password is not matching!';
  }

  return errors;
}

export function ValidateEditUser(form) {
  const errors = {};
  const patternEmail = /^([^\s@]+@[^\s@]+\.[^\s@]+$)$/i;
  const nameRegex = /^([a-zA-Z-])([a-zA-Z-äöü_\s]){0,25}$/i;

  if (!nameRegex.test(form.name)) {
    errors.name = 'Your name is not valid!';
  }
  if (!form.email) {
    errors.email = 'Email adress is required!';
  } else if (!patternEmail.test(form.email)) {
    errors.email = 'Email format is invalid!';
  }

  return errors;
}

export function ValidateCreateStudioListing(form) {
  const errors = {};
  const studioName = /^([a-zA-Z-])([a-zA-Z-0-9-!äöü,-_\s]){4,39}$/i;
  const url = /^((http|https):\/\/)/;
  const patternLocation = /^([a-zA-Z-0-9,äßöü])([a-zA-Z-0-9,äßöü\s]){4,160}$/i;

  if (!form.studioName) {
    errors.listingTitle = 'A Studioname is required!';
  } else if (!studioName.test(form.listingTitle)) {
    errors.listingTitle = 'Your input is not valid!';
  }

  if (!form.profileText) {
    errors.profileText = 'A profiletext is required!';
  } else if (form.profileText.length >= 351) {
    errors.profileText = 'Your profiletext is too long!';
  } else if (form.profileText.length <= 24) {
    errors.profileText = 'Your profiletext is too short! Min length is 25';
  }

  if (!form.studiotype) {
    errors.studiotype = "Just don't. Instead be a part!";
  }
  if (!form.studioLanguages) {
    errors.studioLanguages = 'Add at least one languag to your studio!';
  } else if (form.studioLanguages.length >= 11) {
    errors.studioLanguages = 'Your iput is too long!';
  } else if (form.studioLanguages.length < 1) {
    errors.studioLanguages = 'Your input is too short! Min length is 3';
  }

  if (
    form.studioSocials.soundcloud?.length <= 8 &&
    form.studioSocials.spotify?.length <= 8 &&
    form.studioSocials.youtube?.length <= 8 &&
    form.studioSocials.facebook?.length <= 8 &&
    form.studioSocials.instagram?.length <= 8 &&
    form.studioSocials.twitter?.length <= 8 &&
    form.studioSocials.pinterest?.length <= 8 &&
    form.studioSocials.linkedin?.length <= 8
  ) {
    errors.studioSocials = 'Enter at least one social account link of your studio or yourself!';
  } else if (
    form.studioSocials.soundcloud?.length >= 101 ||
    form.studioSocials.spotify?.length >= 101 ||
    form.studioSocials.youtube?.length >= 101 ||
    form.studioSocials.facebook?.length >= 101 ||
    form.studioSocials.instagram?.length >= 101 ||
    form.studioSocials.twitter?.length >= 101 ||
    form.studioSocials.pinterest?.length >= 101 ||
    form.studioSocials.linkedin >= 101
  ) {
    errors.studioSocials = 'The max length for each social is 100 characters';
  } else if (
    (form.studioSocials.soundcloud?.length >= 2 && !url.test(form.studioSocials.soundcloud)) ||
    (form.studioSocials.spotify?.length >= 2 && !url.test(form.studioSocials.spotify)) ||
    (form.studioSocials.youtube?.length >= 2 && !url.test(form.studioSocials.youtube)) ||
    (form.studioSocials.facebook?.length >= 2 && !url.test(form.studioSocials.facebook)) ||
    (form.studioSocials.instagram?.length >= 2 && !url.test(form.studioSocials.instagram)) ||
    (form.studioSocials.twitter?.length >= 2 && !url.test(form.studioSocials.twitter)) ||
    (form.studioSocials.pinterest?.length >= 2 && !url.test(form.studioSocials.pinterest)) ||
    (form.studioSocials.linkedin?.length >= 2 && !url.test(form.studioSocials.linkedin))
  ) {
    errors.studioSocials = 'Url invalid! Max length for socials is 100 and it must begin with https://';
  }

  if (form.locationFeatures.length === 0) {
    errors.locationFeatures = 'Select at least 1 location feature!';
  }

  if (!form.studioLocation.address) {
    errors.studioLocation = 'A studio location is required!';
  } else if (!patternLocation.test(form.studioLocation.address)) {
    errors.studioLocation = 'Your input is not valid';
  }
  return errors;
}

export function ValidateCreateStudioServiceListing(form, checked) {
  const errors = {};
  const regex = /^([a-zA-Z-])([a-zA-Z-0-9!äöü,-_\s]){9,60}$/i;

  if (!form.service) {
    errors.service = 'Select a Service please!';
  }
  if (form.service.length === 0) {
    errors.service = 'Select at least 1 service!';
  }

  if (!form.listingTitle) {
    errors.listingTitle = 'A Title for this Studioservice is required!';
  } else if (!regex.test(form.listingTitle)) {
    errors.listingTitle = 'Your input is not valid!';
  }

  if (!form.description) {
    errors.description = 'Type your description for this Studioservice please!';
  } else if (form.description.length <= 99) {
    errors.description = 'The description is too short';
  } else if (form.description.length >= 2501) {
    errors.description = 'The description is too long';
  }

  if (!form.maxGuests) {
    errors.description = 'Choose your max Guests!';
  }

  if (!form.equipment) {
    errors.equipment = 'You need to type in your Equipment details for this Studioservice listing!!';
  }

  if (checked.pricing.indexOf('pricingHour') > -1 && !form.pricing.pricingHour) {
    errors.pricing = 'Enter your price!';
  } else if (form.pricing.pricingHour?.length >= 5) {
    errors.pricing = 'The max length is 4 numbers';
  }

  if (checked.pricing.indexOf('pricingDay') > -1 && !form.pricing.pricingDay) {
    errors.pricing = 'Enter your price!';
  } else if (form.pricing.pricingDay?.length >= 5) {
    errors.pricing = 'The max length is 4 numbers';
  }

  if (checked.pricing.indexOf('pricingWeek') > -1 && !form.pricing.pricingWeek) {
    errors.pricing = 'Enter your price!';
  } else if (form.pricing.pricingWeek?.length >= 5) {
    errors.pricing = 'The max length is 4 numbers';
  }

  if (checked.pricing.indexOf('pricingMonth') > -1 && !form.pricing.pricingMonth) {
    errors.pricing = 'Enter your price!';
  } else if (form.pricing.pricingMonth?.length >= 5) {
    errors.pricing = 'The max length is 4 numbers';
  }

  if (Object.keys(form.pricing).length === 0 && form.pricing.constructor === Object) {
    errors.pricing = 'Select at least 1 studio pricing option!';
  }

  if (!form.soundengineer) {
    errors.soundengineer = 'Select a option for Soundengineer!';
  } else if (form.soundengineer.soundengineerPrice?.length >= 5) {
    errors.soundengineer = 'The max length is 4 numbers';
  }
  return errors;
}

export function ValidateCreateStudioService(form) {
  const errors = {};
  const serviceName = /^([a-zA-Z-])([a-zA-Z-0-9ä&öü\s]){2,60}$/i;
  const serviceDescription = /^([a-zA-Z-])([a-zA-Z-0-9,.!ä?&öü\s]){9,149}$/i;

  if (!form.name) {
    errors.name = 'A Servicename is required!';
  } else if (!serviceName.test(form.name)) {
    errors.name = 'Your service name input is not valid!';
  }
  if (!form.description) {
    errors.description = 'A Servicedescription is required!';
  } else if (!serviceDescription.test(form.description)) {
    errors.description = 'Your service description input is not valid!';
  }

  return errors;
}
