const mongoose = require("mongoose");

const moviePosterSchema = new mongoose.Schema(
  {
    year: Number,
    season: Number,
    moviePosters: [{ data: Buffer, contentType: String }],
  },
  {
    timestamps: true,
  }
);

const MoviePoster = mongoose.model("MoviePoster", moviePosterSchema);
module.exports = MoviePoster;
