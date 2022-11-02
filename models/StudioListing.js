import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

// const studioListingSchema = new mongoose.Schema(
// 	{
// 		id: { type: String },
// 		title: { type: String, required: true },
// 		studioname: { type: String, required: true },
// 		openingOption: { type: String, required: true },
// 		openingCustom: {
// 			type: Object,
// 			required: true,
// 			default: false,
// 		},
// 		img: { type: String, required: true },
// 		studiotype: { type: String, required: true },
// 		services: { type: Array, required: true },
// 		maxGuests: { type: Number, required: true },
// 		soundEngineer: { type: Object, required: true },
// 		soundEngineerPrice: { type: Object, required: false },
// 		studioBooking: { type: Object, required: true },
// 		description: { type: String, required: true },
// 		locationFeatures: { type: Object, required: false },
// 		equipment: { type: Array, required: false },
// 		references: { type: String, required: false },
// 		socialMedia: { type: Object, required: false },
// 		location: { type: String, required: true },
// 	},
// 	{
// 		timestamps: true,
// 	}
// );
const studioListingSchema = new mongoose.Schema(
	{
		maxGuests: { type: Number, default: 3 },
		id: { type: String, default: nanoid() },
		listingTitle: { type: String },
		images: {
			type: String,
			default: '/public/Thumbnail-Default.png',
			set: (v) => (v === '' || undefined || null ? '/public/Thumbnail-Default.png' : v),
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
const StudioListing =
	mongoose.models.StudioListing || mongoose.model('StudioListing', studioListingSchema);
export default StudioListing;
