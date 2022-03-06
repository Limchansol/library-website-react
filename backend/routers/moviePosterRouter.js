const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const moviePosterRouter = express.Router();
const sharp = require("sharp");
const multer = require("multer");
const upload = multer();
const MoviePoster = require("../models/moviePosterModel");

moviePosterRouter.get(
  "/:year/:season",
  expressAsyncHandler(async (req, res) => {
    const { year, season } = req.params;
    const temp = await MoviePoster.findOne({
      $and: [{ year: Number(year), season: Number(season) }],
    });
    const moviePosters = temp?.moviePosters?.map?.((e, i) => {
      return {
        data: Buffer.from(e.data).toString("base64"), //base64로 바이너리 버퍼를 바꿔주지 않으면 무슨 수를 써도 react에서 이미지를 띄울 수가 없다...react에서는 Buffer가 없다...
        contentType: e.contentType,
      };
    });
    res.send(moviePosters);
  })
);

moviePosterRouter.put(
  "/update/:year/:season",
  upload.array("moviePosters"),
  expressAsyncHandler(async (req, res) => {
    const { year, season } = req.params;
    const tempArr = [];
    for (const e of req.files) {
      const resizedImg = await sharp(e.buffer)
        .resize({ width: 200 })
        .toBuffer();
      tempArr.push({ data: resizedImg, contentType: e.mimetype });
    }
    const moviePosters = await MoviePoster.updateOne(
      { $and: [{ year: Number(year), season: Number(season) }] },
      {
        moviePosters: tempArr,
      },
      { upsert: true }
    );
    res.send(moviePosters);
  })
);

moviePosterRouter.delete(
  "/remove/:order",
  expressAsyncHandler(async (req, res) => {
    const { order } = req.params;
    const del = await MoviePoster.deleteOne({ order: Number(order) });
    res.send(del);
  })
);
//지금 사실 이달의 책 데이터베이스의 용량이 무지막지하다...sharp 이용해서 줄이자.
module.exports = moviePosterRouter;
