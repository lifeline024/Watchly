import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import axios from 'axios';
import Movie from './models/Movie.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Init bot
const bot = new Telegraf(process.env.BOT_TOKEN);
const CHANNEL_ID = process.env.CHANNEL_ID;

// Save new channel post (video/document only)
bot.on('channel_post', async (ctx) => {
  try {
    const { message_id, caption, video, document } = ctx.channelPost;

    // Skip if no caption or not a video/document
    if (!caption || (!video && !document)) return;

    // Avoid duplicates
    const exists = await Movie.findOne({ message_id });
    if (exists) return;

    const titleLine = caption.split('\n')[0].trim();
    const yearMatch = caption.match(/(19|20)\d{2}/);
    const extractedYear = yearMatch ? yearMatch[0] : "Unknown";

    let posterUrl = null;

    // Try fetching poster from OMDb
    try {
      const response = await axios.get(`https://www.omdbapi.com/?t=${encodeURIComponent(titleLine)}&apikey=${process.env.OMDB_API_KEY}`);
      if (response.data?.Poster && response.data.Poster !== "N/A") {
        posterUrl = response.data.Poster;
      }
    } catch (apiErr) {
      console.warn("⚠️ OMDb API error:", apiErr.message);
    }

    // Save to MongoDB
    const newMovie = new Movie({
      caption,
      message_id,
      quality: "1080p",
      year: extractedYear,
      poster: posterUrl
    });

    await newMovie.save();
    console.log(`✅ Movie saved: ${titleLine} [MSG_ID=${message_id}]`);
  } catch (err) {
    console.error("❌ Error saving channel post:", err.message);
  }
});

// /start <msgId>
bot.start(async (ctx) => {
  const msgId = ctx.startPayload;
  if (!msgId) return ctx.reply("⚠️ Message ID missing.");

  try {
    const movie = await Movie.findOne({ message_id: msgId });
    if (!movie) return ctx.reply("❌ Movie not found.");

    await ctx.telegram.forwardMessage(ctx.chat.id, CHANNEL_ID, msgId);
    ctx.reply("🎬 Movie sent! Enjoy.");
  } catch (err) {
    console.error("❌ Error forwarding movie:", err.message);
    ctx.reply("⚠️ Could not send movie.");
  }
});

// Start bot
bot.launch();
console.log("🤖 Telegram bot is running...");

// Graceful shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
