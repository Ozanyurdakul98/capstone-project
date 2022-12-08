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
    studioName: { type: String, required: true, trim: true },
    profileText: { type: String, required: true, trim: true },
    studiotype: { type: String, required: true, trim: true },
    studioSize: { type: String, trim: true },
    studioRooms: { type: String, trim: true },
    studioLanguages: { type: Array, required: true, trim: true },
    openingHours: {
      type: String,
      required: true,
      trim: true,
    },
    locationFeatures: { type: Array, required: true, trim: true },
    studioBeds: { type: Object, trim: true },
    studioSocials: { type: Object, required: true, trim: true },
    studioLocation: { type: String, required: true, trim: true },
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
