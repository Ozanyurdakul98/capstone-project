import mongoose from 'mongoose';
import './StudioService';
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
    studioName: { type: String, required: true },
    profileText: { type: String, required: true },
    studiotype: { type: String, required: true },
    studioLanguages: { type: Array, required: true },
    openingHours: {
      type: String,
      required: true,
    },
    locationFeatures: { type: Array, required: true },
    studioSocials: { type: Object, required: true },
    studioLocation: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const StudioListing = mongoose.models.StudioListing || mongoose.model('StudioListing', studioListingSchema);
export default StudioListing;
