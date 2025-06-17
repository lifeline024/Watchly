// models/Movie.js
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  caption: String,
  message_id: { type: String, unique: true },
  quality: { type: String, default: "1080p" },
  poster: String,
  year: String,
  createdAt: { type: Date, default: Date.now }
});


export default mongoose.models.Movie || mongoose.model("Movie", movieSchema);
