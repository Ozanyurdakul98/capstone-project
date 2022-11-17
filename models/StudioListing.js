import mongoose from 'mongoose';

const studioListingSchema = new mongoose.Schema(
  {
    maxGuests: { type: Number, default: 3 },
    listingTitle: { type: String },
    images: {
      type: String,
      default: '/images/Thumbnail-default.png',
      set: (v) => (v === '' || undefined || null ? '/images/Thumbnail-default.png' : v),
    },
    openingHours: {
      type: String,
      default: 'Always Available',
    },
    studiotype: { type: String },
    services: { type: Array },
    locationFeatures: { type: Array },
    soundengineer: { type: Object },
    studioPricing: { type: Object },
    studioLocation: { type: String },
  },
  {
    timestamps: true,
  }
);

// openingCustom: { type: Boolean, required: true, default: false },
//Usermodel
const StudioListing = mongoose.models.StudioListing || mongoose.model('StudioListing', studioListingSchema);
export default StudioListing;
