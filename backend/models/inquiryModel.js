const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    title: { type: String },
    sort: { type: String },
    content: { type: String },
    userName: { type: String },
    createdAt: { type: String },
  },
  {
    timestamps: true,
  }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

module.exports = Inquiry;
