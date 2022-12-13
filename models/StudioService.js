import mongoose from 'mongoose';
import './AdminCreateStudioService';
import './StudioListing';
import './User';
const { Schema } = mongoose;

const studioServiceSchema = new mongoose.Schema(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: 'AdminStudioService',
      required: true,
      trim: true,
    },
    listingTitle: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    images: {
      primary: {
        type: String,
        default: '/images/Thumbnail-default.png',
        set: (v) => (v === '' || undefined || null ? '/images/Thumbnail-default.png' : v),
        required: true,
      },
      other: { type: Object, trim: true },
    },
    maxGuests: { type: Number, default: 3, trim: true },
    equipment: { type: String, required: true, trim: true },
    additionalServices: { type: Array, trim: true },
    soundengineer: { type: Object, required: true, trim: true },
    pricing: { type: Object, required: true, trim: true },
    subInformations: {
      type: Object,
      trim: true,
      currency: { type: String, default: 'USD' },
      locale: { type: String, default: 'en-US' },
    },
    studio: {
      type: Schema.Types.ObjectId,
      ref: 'StudioListing',
      required: true,
      trim: true,
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

const StudioService = mongoose.models.StudioService || mongoose.model('StudioService', studioServiceSchema);
export default StudioService;
