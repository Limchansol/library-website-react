const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const BookOfTheMonth = require("../models/bookOfTheMonthModel");
const bookOfTheMonthRouter = express.Router();

bookOfTheMonthRouter.get(
  "/:month",
  expressAsyncHandler(async (req, res) => {
    const targetBook = await BookOfTheMonth.findOne({
      month: req.params.month,
    });
    res.send(targetBook);
  })
);

bookOfTheMonthRouter.put(
  "/update/:month",
  expressAsyncHandler(async (req, res) => {
    const { month } = req.params;
    const targetBook = await BookOfTheMonth.updateOne(
      { month: month },
      req.body.targetBook,
      { upsert: true }
    );
    res.send(targetBook);
  })
);

bookOfTheMonthRouter.post(
  "/create",
  expressAsyncHandler(async (req, res) => {
    const targetBook = req.body.targetBook;
    const savedBook = new BookOfTheMonth(targetBook);
    savedBook.save();
    res.send(savedBook);
  })
);
module.exports = bookOfTheMonthRouter;
