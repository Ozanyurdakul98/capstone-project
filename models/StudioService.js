import mongoose from "mongoose";

const { Schema } = mongoose;

const studioServiceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const StudioService =
  mongoose.models.StudioService || mongoose.model("StudioService", studioServiceSchema);

export default StudioService;
