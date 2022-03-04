const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Util = require("../models/utilModel");
const utilRouter = express.Router();

utilRouter.get(
  "/movieSeason",
  expressAsyncHandler(async (req, res) => {
    const util = await Util.findOne({});
    res.send(util);
  })
);

utilRouter.put(
  "/updateMovieSeason",
  expressAsyncHandler(async (req, res) => {
    const util = await Util.updateOne(
      {},
      {
        movieSeason: Number(req.body.movieSeason),
      },
      { upsert: true }
    );
    res.send(util);
  })
);

module.exports = utilRouter;
