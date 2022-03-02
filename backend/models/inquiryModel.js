const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    id: { type: String },
    title: { type: String },
    sort: { type: String },
    content: { type: String },
    userName: { type: String },
    answer: { type: String, default: "아직 답변이 등록되지 않았습니다" },
    createdAt: { type: String },
  },
  {
    timestamps: true,
  }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

module.exports = Inquiry;
