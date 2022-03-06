const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const promotionRouter = express.Router();
const multer = require("multer");
const sharp = require("sharp");
const Promotion = require("../models/promotionModel");
const upload = multer();

promotionRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const temp = await Promotion.find({});
    const promotions = temp.map((e, i) => {
      return {
        ad: {
          data: Buffer.from(e.ad.data).toString("base64"), //base64로 바이너리 버퍼를 바꿔주지 않으면 무슨 수를 써도 react에서 이미지를 띄울 수가 없다...react에서는 Buffer가 없다...
          contentType: e.ad.contentType,
          link: e.ad.link,
        },
      };
    });
    res.send(promotions);
  })
);

promotionRouter.put(
  "/update/:order",
  upload.single("ad"),
  expressAsyncHandler(async (req, res) => {
    const resizedImg = await sharp(req.file.buffer).resize(270, 270).toBuffer();
    const { order } = req.params;
    const promotions = await Promotion.updateOne(
      { order: Number(order) },
      {
        ad: {
          data: resizedImg,
          contentType: req.file.mimetype,
          link: req.body.link,
        },
      },
      { upsert: true }
    );
    res.send(promotions);
  })
);

promotionRouter.delete(
  "/remove/:order",
  expressAsyncHandler(async (req, res) => {
    const { order } = req.params;
    const del = await Promotion.deleteOne({ order: Number(order) });
    res.send(del);
  })
);
//지금 사실 이달의 책 데이터베이스의 용량이 무지막지하다...sharp 이용해서 줄이자.
module.exports = promotionRouter;
