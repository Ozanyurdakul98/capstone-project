import { createSlice } from '@reduxjs/toolkit';

const languages = [
  'Afrikaans',
  'Albanian',
  'Arabic',
  'Armenian',
  'Azerbaijani',
  'Belarusian',
  'Bulgarian',
  'Catalan',
  'Chinese',
  'Croatian',
  'Czech',
  'Danish',
  'Dutch',
  'English',
  'Filipino',
  'Finnish',
  'French',
  'Georgian',
  'German',
  'Greek',
  'Hebrew',
  'Hindi',
  'Hungarian',
  'Indonesian',
  'Irish',
  'Italian',
  'Japanese',
  'Kannada',
  'Korean',
  'Latin',
  'Lithuanian',
  'Macedonian',
  'Maltese',
  'Mongolian',
  'Nepali',
  'Norwegian',
  'Persian',
  'Polish',
  'Portuguese',
  'Romanian',
  'Russian',
  'Scottish',
  'Serbian',
  'Slovenian',
  'Spanish',
  'Swedish',
  'Thai',
  'Turkish',
  'Turkmen',
  'Ukrainian',
  'Urdu',
  'Uyghur',
  'Uzbek',
  'Vietnamese',
];
const defaultChecked = { studioSocials: [], studioInformation: [], studioLanguages: languages, sleepOver: [] };
const defaultForm = {
  logo: '',
  studioName: '',
  profileText: '',
  studiotype: 'Home Studio',
  studioInformation: {},
  studioLanguages: [],
  openingHours: 'Always Available',
  locationFeatures: [],
  sleepOver: {},
  studioSocials: {
    soundcloud: '',
    spotify: '',
    instagram: '',
    youtube: '',
    facebook: '',
    pinterest: '',
    twitter: '',
    linkedin: '',
  },
  studioRules: [],
  additionalStudioRules: '',
  studioLocation: {
    fullAddress: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalcode: '',
    geolocation: '',
  },
  user: '',
};

const addStudio = createSlice({
  name: 'addStudio',
  initialState: {
    form: {
      logo: '',
      studioName: '',
      profileText: '',
      studiotype: 'Home Studio',
      studioInformation: {},
      studioLanguages: [],
      openingHours: 'Always Available',
      locationFeatures: [],
      sleepOver: {},
      studioSocials: {
        soundcloud: '',
        spotify: '',
        instagram: '',
        youtube: '',
        facebook: '',
        pinterest: '',
        twitter: '',
        linkedin: '',
      },
      studioRules: [],
      additionalStudioRules: '',
      studioLocation: {
        fullAddress: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postalcode: '',
        geolocation: '',
      },
      user: '',
    },
    checked: { studioInformation: [], studioLanguages: languages, sleepOver: [] },
  },
  reducers: {
    updateForm: (state, action) => {
      if ('geolocation ' in action.payload) {
        state.form.studioLocation = { ...state.form.studioLocation, ...action.payload };
        return;
      }
      state.form = { ...state.form, ...action.payload };
    },
    updateChecked: (state, action) => {
      state.checked = { ...state.checked, ...action.payload };
    },
    resetLanguages: (state) => {
      state.checked.studioLanguages = languages;
    },
    resetForm: (state, action) => {
      state.form = { ...defaultForm, user: action.payload ? action.payload : '' };
    },
    resetChecked: (state) => {
      state.checked = defaultChecked;
    },
    handleGeocoderRetrieve: (state, action) => {
      const res = action.payload;
      const geo = res.context ? res.context : ['', '', '', ''];
      const geo0 = geo[0] ? geo[0] : '';
      const geo1 = geo[1] ? geo[1] : '';
      const geo2 = geo[2] ? geo[2] : '';
      const geo3 = geo[3] ? geo[3] : '';

      state.form.studioLocation = {
        ...state.form.studioLocation,
        address: res.text ? res.text : '',
        fullAddress: res.place_name ? res.place_name : '',
        city: geo1 ? geo1.text : '',
        postalcode: geo0 ? geo0.text : '',
        state: geo2 ? geo2.text : '',
        country: geo3 ? geo3.text : '',
        geolocation: res.geometry?.coordinates ? res.geometry.coordinates : [0, 0],
      };
    },
  },
});

export const { updateChecked, updateForm, resetLanguages, resetForm, resetChecked, handleGeocoderRetrieve } =
  addStudio.actions;

export default addStudio;
