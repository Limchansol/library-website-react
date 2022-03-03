const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const BookOfTheMonth = require("../models/bookOfTheMonthModel");
const bookOfTheMonthRouter = express.Router();
const multer = require("multer");
const upload = multer();

bookOfTheMonthRouter.get(
  "/:month",
  expressAsyncHandler(async (req, res) => {
    const targetBook = await BookOfTheMonth.findOne({
      month: req.params.month,
    });
    res.send({
      month: targetBook.month,
      title: targetBook.title,
      writer: targetBook.writer,
      paragraph: targetBook.paragraph,
      bookImg: {
        data: Buffer.from(targetBook.bookImg.data).toString("base64"), //base64로 바이너리 버퍼를 바꿔주지 않으면 무슨 수를 써도 react에서 이미지를 띄울 수가 없다...react에서는 Buffer가 없다...
        contentType: targetBook.bookImg.contentType,
      },
    });
  })
);

bookOfTheMonthRouter.put(
  "/update/:month",
  upload.single("bookImg"),
  expressAsyncHandler(async (req, res) => {
    const { month } = req.params;
    const targetBook = await BookOfTheMonth.updateOne(
      { month: month },
      {
        month: Number(req.body.month),
        title: req.body.title,
        writer: req.body.writer,
        paragraph: req.body.paragraph,
        bookImg: { data: req.file.buffer, contentType: req.file.mimetype },
      },
      { upsert: true }
    );
    res.send(targetBook);
  })
);
//지금 사실 이달의 책 데이터베이스의 용량이 무지막지하다...sharp 이용해서 줄이자.
module.exports = bookOfTheMonthRouter;
