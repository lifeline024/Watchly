import Movie from "../models/Movie.js";

export const getAllMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

export const addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    console.log("✅ Movie added:", movie);
    res.status(201).json(movie);
  } catch (err) {
    console.error("❌ Error adding movie:", err);
    res.status(500).json({ message: "Failed to add movie" });
  }
};

