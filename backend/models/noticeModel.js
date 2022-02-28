const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String },
  content: { type: String },
  createdAt: { type: String },
  writer: { type: String, default: "chans" },
});

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice;
