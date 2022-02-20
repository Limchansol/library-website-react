const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    writer: { type: String, required: true },
    publisher: { type: String, required: true },
    ISBN: { type: String },
    date: { type: String },
    keyword: { type: String },
    kdc: { type: Number }, //kdc는 한국십진분류표, 책의 형식나 주제를 요약해놓은 정보
  },
  {
    timestamps: true,
  }
);
//isbn이 꼭 필요하다고 생각했는데, 받아온 data에 trash가 있어서 한참 고생함. 데이터가 항상 완벽하다고 생각하지 말자.
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
