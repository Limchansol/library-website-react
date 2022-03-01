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

calenderRouter.put(
  "/changeSchedule",
  expressAsyncHandler(async (req, res) => {
    const calender = await Calender.updateOne({}, { specialDay: req.body });
    res.send(calender);
  })
);

calenderRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const calender = await Calender.insertMany([
      { specialDay: { redDay: [], orangeDay: [], greenDay: [] } },
    ]);
    res.send(calender);
  })
);

module.exports = calenderRouter;
