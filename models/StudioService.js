import mongoose from "mongoose";

const { Schema } = mongoose;

const studioServiceSchema = new Schema({
  name: { type: String, unique: true, required: true, trim: true },
  description: { type: String, unique: true, required: true, trim: true },
});

const StudioService =
  mongoose.models.StudioService || mongoose.model("StudioService", studioServiceSchema);

export default StudioService;
