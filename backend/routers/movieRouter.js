const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data");
const Movie = require("../models/movieModel");
const movieRouter = express.Router();

movieRouter.get(
  "/:year/:season",
  expressAsyncHandler(async (req, res) => {
    const { year, season } = req.params;
    const movie = await Movie.findOne({
      $and: [{ year: Number(year), season: Number(season) }],
    });
    res.send(movie);
  })
);

movieRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const movie = await Movie.insertMany(data.programInfo);
    res.send({ movie });
  })
);

movieRouter.put(
  "/update/:year/:season",
  expressAsyncHandler(async (req, res) => {
    const { year, season } = req.params;
    const movie = await Movie.updateOne(
      { $and: [{ year: Number(year), season: Number(season) }] },
      {
        theme: req.body.theme,
        intro: req.body.intro,
        movies: req.body.movies,
      },
      { upsert: true }
    );
    res.send(movie);
  })
);

module.exports = movieRouter;
