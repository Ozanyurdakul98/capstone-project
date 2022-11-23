import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, default: 'guest' },
    name: { type: String, default: 'Guest' },
    lastname: { type: String, default: 'guest' },
    email: { type: String, required: true },
    password: { type: String, required: true },
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
