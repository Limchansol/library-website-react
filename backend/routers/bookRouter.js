const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data.js");
const Book = require("../models/bookModel.js");

const bookRouter = express.Router();

bookRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    if (req.query.ISBN !== undefined) {
      const books = await Book.find({
        ISBN: req.query.ISBN,
      });
      res.send(books);
      return;
    }
    if (req.query.publisher !== undefined) {
      const books = await Book.find({
        publisher: {
          $regex: req.query.publisher.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        },
      });
      res.send(books);
      return;
    }
    if (req.query.writer !== undefined) {
      const books = await Book.find({
        writer: {
          $regex: req.query.writer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        },
      });
      res.send(books);
      return;
    }
    if (req.query.title !== undefined) {
      const books = await Book.find({
        title: {
          $regex: req.query.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        },
      });
      res.send(books);
      return;
    }
    if (req.query.all !== undefined) {
      const books = await Book.find({
        $or: [
          {
            title: {
              $regex: req.query.all.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            },
          },
          {
            writer: {
              $regex: req.query.all.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            },
          },
          {
            publisher: {
              $regex: req.query.all.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            },
          },
          {
            ISBN: req.query.all,
          },
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
    const cursor = req.query.cursor;
    const limit = req.query.limit;
    const afterCursorBooks = await Book.find({
      $and: [
        {
          kdc: {
            $gte: Number(req.query.subNum) * 100,
            $lt: (Number(req.query.subNum) + 1) * 100,
          },
        },
        cursor
          ? {
              _id: { $gte: cursor },
            }
          : {}, //cursor에 값 없으면 무조건 true리턴하도록 해야 함.(처음 요청에는 cursor쿼리가 없을 수도 있음)
      ],
    });
    const books = afterCursorBooks.filter((e, i) => {
      return i < limit;
    });
    let nextCursor = afterCursorBooks[limit]?._id;
    if (nextCursor === undefined) nextCursor = null;
    res.send({
      books,
      paging: {
        nextCursor: nextCursor,
      },
    });
  })
);

bookRouter.get(
  "/detailed",
  expressAsyncHandler(async (req, res) => {
    const books = await Book.find({
      $and: [
        {
          title: {
            $regex: req.query.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          }, //정규표현식에서 특수문자를 escapse해주도록 하는 간단한 로직을 추가!!!!!!
        },
        {
          writer: {
            $regex: req.query.writer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          },
        },
        {
          publisher: {
            $regex: req.query.publisher.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          },
        },
        {
          ISBN: req.query.isbn,
        },
      ],
    }); //큰 버그가 존재한다! 검색시 특수기호를 포함한 쿼리가 있으면 그것을 인코딩하고 보내야 한다! 반드시 수정할 것.
    //또한 isbn같은 경우, 정확한 검색일 때에만 검색할 수 있도록 만들어 줘야 할 것이다!
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
