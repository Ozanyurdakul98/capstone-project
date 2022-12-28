import mongoose from 'mongoose';
import './User';
const { Schema } = mongoose;

const studioListingSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      default: '/images/Thumbnail-default.png',
      set: (v) => (v === '' || undefined || null ? '/images/Thumbnail-default.png' : v),
      required: true,
    },
    studioName: { type: String, required: true, trim: true },
    profileText: { type: String, required: true, trim: true },
    studiotype: { type: String, required: true, trim: true },
    studioInformation: { type: Object, trim: true },
    studioLanguages: { type: Array, required: true, trim: true },
    openingHours: {
      type: String,
      required: true,
      trim: true,
    },
    locationFeatures: { type: Array, required: true, trim: true },
    sleepOver: { type: Object, default: {}, trim: true },
    studioSocials: { type: Object, required: true, trim: true },
    studioRules: { type: Array, trim: true, index: true, default: [''] },
    additionalStudioRules: { type: String, trim: true, index: true, default: '' },
    studioLocation: {
      fullAddress: { type: String, required: true, trim: true, default: '' },
      address: { type: String, required: true, trim: true, default: '' },
      city: { type: String, required: true, trim: true, default: '' },
      postalcode: { type: String, required: true, trim: true, default: '' },
      country: { type: String, required: true, trim: true, default: '' },
      geolocation: { type: Array, required: true, trim: true, default: '' },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const StudioListing = mongoose.models.StudioListing || mongoose.model('StudioListing', studioListingSchema);
export default StudioListing;
