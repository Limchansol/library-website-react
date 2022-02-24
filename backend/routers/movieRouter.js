const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data");
const Movie = require("../models/movieModel");
const movieRouter = express.Router();

movieRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const movie = await Movie.find({});
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

module.exports = movieRouter;
