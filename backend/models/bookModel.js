const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    writer: { type: String, required: true },
    publisher: { type: String, required: true },
    ISBN: { type: String, required: true },
    date: { type: String, required: true },
    keyword: { type: String },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
