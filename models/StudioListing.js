import mongoose from 'mongoose';

const studioListingSchema = new mongoose.Schema(
	{
		id: { type: String },
		title: { type: String, required: true },
		studioname: { type: String, required: true },
		openingOption: { type: String, required: true },
		openingCustom: {
			type: Object,
			required: true,
			default: false,
		},
		img: { type: String, required: true },
		studiotype: { type: String, required: true },
		services: { type: Array, required: true },
		maxGuests: { type: Number, required: true },
		soundEngineer: { type: Object, required: true },
		soundEngineerPrice: { type: Object, required: false },
		studioBooking: { type: Object, required: true },
		description: { type: String, required: true },
		locationFeatures: { type: Object, required: false },
		equipment: { type: Array, required: false },
		references: { type: String, required: false },
		socialMedia: { type: Object, required: false },
		location: { type: String, required: true },
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
