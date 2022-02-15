const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data.js");
const Book = require("../models/bookModel.js");

const bookRouter = express.Router();

bookRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    if (req.query.ISBN !== undefined) {
      const books = await Book.find({ ISBN: req.query.ISBN });
      res.send(books);
      return;
    }
    if (req.query.publisher !== undefined) {
      const books = await Book.find({ publisher: req.query.publisher });
      res.send(books);
      return;
    }
    if (req.query.writer !== undefined) {
      const books = await Book.find({ writer: req.query.writer });
      res.send(books);
      return;
    }
    if (req.query.title !== undefined) {
      const books = await Book.find({ title: req.query.title });
      res.send(books);
      return;
    }
    if (req.query.all !== undefined) {
      const books = await Book.find({
        $or: [
          { title: req.query.all },
          { writer: req.query.all },
          { publisher: req.query.all },
          { ISBN: req.query.all },
        ],
      });
      res.send(books);
      return;
    }
    res.status(404).send({ message: "not found" });
  })
);

bookRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const books = await Book.insertMany(data.books);
    res.send(books);
  })
);

exports.bookRouter = bookRouter;
