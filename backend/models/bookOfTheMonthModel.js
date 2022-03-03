const mongoose = require("mongoose");

const bookOfTheMonthSchema = new mongoose.Schema(
  {
    month: { type: Number },
    title: { type: String },
    writer: { type: String },
    paragraph: { type: String },
    bookImg: { data: Buffer, contentType: String },
  },
  {
    timestamps: true,
  }
);

const BookOfTheMonth = mongoose.model("BookOfTheMonth", bookOfTheMonthSchema);
module.exports = BookOfTheMonth;
