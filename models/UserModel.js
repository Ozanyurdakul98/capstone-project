import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'guest' },
    email: { type: String },
    password: { type: String },
    avatar: {
      type: String,
      default: '/images/Thumbnail-Default.png',
      set: (v) => (v === '' || undefined || null ? '/images/Thumbnail-Default.png' : v),
    },
  },
  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;
