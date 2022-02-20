const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data.js");
const Book = require("../models/bookModel.js");

const bookRouter = express.Router();

bookRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    if (req.query.ISBN !== undefined) {
      const books = await Book.find({ ISBN: { $regex: req.query.ISBN } });
      res.send(books);
      return;
    }
    if (req.query.publisher !== undefined) {
      const books = await Book.find({
        publisher: { $regex: req.query.publisher },
      });
      res.send(books);
      return;
    }
    if (req.query.writer !== undefined) {
      const books = await Book.find({ writer: { $regex: req.query.writer } });
      res.send(books);
      return;
    }
    if (req.query.title !== undefined) {
      const books = await Book.find({ title: { $regex: req.query.title } });
      res.send(books);
      return;
    }
    if (req.query.all !== undefined) {
      const books = await Book.find({
        $or: [
          { title: { $regex: req.query.all } },
          { writer: { $regex: req.query.all } },
          { publisher: { $regex: req.query.all } },
          { ISBN: { $regex: req.query.all } },
        ],
      });
      res.send(books);
      return;
    }
    res.status(404).send({ message: "not found" });
  })
);

bookRouter.get(
  "/subject",
  expressAsyncHandler(async (req, res) => {
    const books = await Book.find({
      kdc: {
        $gte: Number(req.query.subNum) * 100,
        $lt: (Number(req.query.subNum) + 1) * 100,
      },
    });
    res.send(books);
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
