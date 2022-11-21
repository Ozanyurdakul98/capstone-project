import mongoose from 'mongoose';
mongoose.set('debug', true);

const studioListingSchema = new mongoose.Schema(
  {
    maxGuests: { type: Number, default: 3 },
    listingTitle: { type: String, required: true },
    images: {
      type: String,
      default: '/images/Thumbnail-default.png',
      set: (v) => (v === '' || undefined || null ? '/images/Thumbnail-default.png' : v),
      required: true,
    },
    openingHours: {
      type: String,
      required: true,
    },
    studiotype: { type: String, required: true },
    services: { type: Array, required: true },
    locationFeatures: { type: Array, required: true },
    soundengineer: { type: Object, required: true },
    studioPricing: { type: Object, required: true },
    studioLocation: { type: String, required: true },
    userEmail: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// openingCustom: { type: Boolean, required: true, default: false },
//Usermodel
const StudioListing = mongoose.models.StudioListing || mongoose.model('StudioListing', studioListingSchema);
export default StudioListing;
