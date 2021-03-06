const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data.js");
const Book = require("../models/bookModel.js");

const bookRouter = express.Router();

bookRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const ISBN = req.query?.ISBN;
    const publisher = req.query?.publisher;
    const writer = req.query?.writer;
    const title = req.query?.title;
    const all = req.query?.all;
    const cursor = req.query.cursor;
    const limit = req.query.limit;

    const afterCursorBooks = await Book.find({
      $and: [
        all
          ? {
              $or: [
                {
                  title: {
                    $regex: req.query.all.replace(
                      /[.*+?^${}()|[\]\\]/g,
                      "\\$&"
                    ),
                  },
                },
                {
                  writer: {
                    $regex: req.query.all.replace(
                      /[.*+?^${}()|[\]\\]/g,
                      "\\$&"
                    ),
                  },
                },
                {
                  publisher: {
                    $regex: req.query.all.replace(
                      /[.*+?^${}()|[\]\\]/g,
                      "\\$&"
                    ),
                  },
                },
                {
                  ISBN: req.query.all,
                },
              ],
            }
          : {},
        title
          ? {
              title: {
                $regex: req.query.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
              },
            }
          : {},
        writer
          ? {
              writer: {
                $regex: req.query.writer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
              },
            }
          : {},
        publisher
          ? {
              publisher: {
                $regex: req.query.publisher.replace(
                  /[.*+?^${}()|[\]\\]/g,
                  "\\$&"
                ),
              },
            }
          : {},
        ISBN
          ? {
              ISBN: req.query.ISBN,
            }
          : {},
        cursor
          ? {
              _id: { $gte: cursor },
            }
          : {},
      ],
    }).limit(Number(limit) + 1);
    let nextCursor = afterCursorBooks[limit]?._id;
    if (nextCursor === undefined) nextCursor = null;
    const books = afterCursorBooks.slice(0, 7);
    res.send({
      books,
      paging: {
        nextCursor: nextCursor,
      },
    });
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
          : {}, //cursor??? ??? ????????? ????????? true??????????????? ?????? ???.(?????? ???????????? cursor????????? ?????? ?????? ??????)
      ],
    }).limit(Number(limit) + 1);
    let nextCursor = afterCursorBooks[limit]?._id;
    if (nextCursor === undefined) nextCursor = null;
    const books = afterCursorBooks.slice(0, 7);
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
    const ISBN = req.query?.ISBN;
    const publisher = req.query?.publisher;
    const writer = req.query?.writer;
    const title = req.query?.title;
    const cursor = req.query.cursor;
    const limit = req.query.limit;
    if (!ISBN && !publisher && !writer && !title) {
      res.status(404).send({ message: "Not Found" });
    }
    const afterCursorBooks = await Book.find({
      $and: [
        title
          ? {
              title: {
                $regex: req.query.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
              }, //????????????????????? ??????????????? escapse???????????? ?????? ????????? ????????? ??????!!!!!!
            }
          : {},
        writer
          ? {
              writer: {
                $regex: req.query.writer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
              },
            }
          : {},
        publisher
          ? {
              publisher: {
                $regex: req.query.publisher.replace(
                  /[.*+?^${}()|[\]\\]/g,
                  "\\$&"
                ),
              },
            }
          : {},
        ISBN
          ? {
              ISBN: req.query.isbn,
            }
          : {},
        cursor
          ? {
              _id: { $gte: cursor },
            }
          : {},
      ],
    }).limit(Number(limit) + 1);
    let nextCursor = afterCursorBooks[limit]?._id;
    if (nextCursor === undefined) nextCursor = null;
    const books = afterCursorBooks.slice(0, 7);
    res.send({
      books,
      paging: {
        nextCursor: nextCursor,
      },
    });
  })
);

bookRouter.get(
  "/searchID",
  expressAsyncHandler(async (req, res) => {
    const idArr = JSON.parse(req.headers.idarray);
    const books = await Promise.all(
      idArr?.map?.((e, i) => {
        const target = Book.findOne({ _id: e });
        return target;
      })
    );
    res.send(books);
  }) //map????????? async?????? ??? ????????? Promise.all????????? ????????????!
);

bookRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const books = await Book.insertMany(data.books);
    res.send(books);
  })
);

bookRouter.get(
  "/forgraph",
  expressAsyncHandler(async (req, res) => {
    const len = await Book.countDocuments({});
    const kdcLenArr = await Promise.all(
      Array(10)
        .fill()
        .map((e, i) => {
          return Book.countDocuments({
            kdc: {
              $gte: Number(i) * 100,
              $lt: (Number(i) + 1) * 100,
            },
          });
        })
    );
    res.send({ len: len, kdcLenArr: kdcLenArr });
  })
);

bookRouter.put(
  "/bookstateUpdate",
  expressAsyncHandler(async (req, res) => {
    const book = await Book.updateOne(
      { _id: req.body._id },
      { $set: { state: req.body.changeTo } }
    );
    res.send(book);
  })
);

exports.bookRouter = bookRouter;
