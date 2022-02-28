const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Calender = require("../models/calenderModel");
const calenderRouter = express.Router();

calenderRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const calender = await Calender.find({});
    res.send(calender);
  })
);

module.exports = calenderRouter;
