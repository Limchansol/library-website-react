const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data.js");
const Notice = require("../models/noticeModel.js");

const noticeRouter = express.Router();

noticeRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const notice = await Notice.find({});
    res.send(notice);
  })
);

noticeRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const notice = await Notice.insertMany(data.noticeList);
    res.send({ notice });
  })
);

module.exports = noticeRouter;
