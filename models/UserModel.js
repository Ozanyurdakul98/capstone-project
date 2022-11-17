import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'guest' },
    email: { type: String },
    password: { type: String },
    avatar: {
      type: String,
      default: '/images/Thumbnail-default.png',
      set: (v) => (v === '' || undefined || null ? '/images/Thumbnail-default.png' : v),
    },
  },
  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;
