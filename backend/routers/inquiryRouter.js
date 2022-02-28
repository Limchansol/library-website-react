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

inquiryRouter.post(
  "/sendInquiry",
  expressAsyncHandler(async (req, res) => {
    const inquiry = new Inquiry(req.body);
    inquiry.save();
    res.send(inquiry);
  })
);

module.exports = inquiryRouter;
