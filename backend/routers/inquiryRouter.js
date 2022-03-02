const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Inquiry = require("../models/inquiryModel");

const inquiryRouter = express.Router();

inquiryRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const inquiry = await Inquiry.find({});
    res.send(inquiry);
  })
);

inquiryRouter.get(
  "/:userId",
  expressAsyncHandler(async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
      res.send({});
      return;
    }
    const inquiry = await Inquiry.find({ id: userId });
    res.send(inquiry);
  })
);

inquiryRouter.post(
  "/sendInquiry",
  expressAsyncHandler(async (req, res) => {
    const inquiry = new Inquiry(req.body);
    inquiry.save();
    res.send(inquiry);
  })
);

inquiryRouter.put(
  "/answerInquiry",
  expressAsyncHandler(async (req, res) => {
    const inquiry = await Inquiry.updateOne(
      { _id: req.body._id },
      { answer: req.body.answer }
    );
    res.send(inquiry);
  })
);

module.exports = inquiryRouter;
