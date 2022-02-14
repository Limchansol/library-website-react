const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data");
const CafeMenu = require("../models/cafeMenuModel");
const cafeMenuRouter = express.Router();

cafeMenuRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const books = await CafeMenu.find({});
    res.send(books);
  })
);

cafeMenuRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const cafeMenu = await CafeMenu.insertMany(data.cafeMenu);
    res.send({ cafeMenu });
  })
);

module.exports = cafeMenuRouter;
