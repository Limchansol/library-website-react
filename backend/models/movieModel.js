const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  year: { type: Number },
  season: { type: Number },
  theme: { type: String },
  intro: { type: String },
  movies: { type: Array },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
