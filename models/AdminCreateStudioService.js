import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminStudioServiceSchema = new Schema({
  image: {
    type: String,
    default: '/images/Thumbnail-default.png',
    set: (v) => (v === '' || undefined || null ? '/images/Thumbnail-default.png' : v),
    required: true,
  },
  name: { type: String, unique: true, required: true, trim: true },
  queryString: { type: String, unique: true, required: true },
  description: { type: String, unique: true, required: true, trim: true },
});

const AdminStudioService =
  mongoose.models.AdminStudioService || mongoose.model('AdminStudioService', adminStudioServiceSchema);

export default AdminStudioService;
