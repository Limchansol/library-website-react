const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const FAQ = require("../models/FAQModel");
const data = require("../data.js");

const FAQRouter = express.Router();

FAQRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const faq = await FAQ.find({});
    res.send(faq);
  })
);

FAQRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const faq = await FAQ.insertMany(data.rawFAQList);
    res.send({ faq });
  })
);

module.exports = FAQRouter;
