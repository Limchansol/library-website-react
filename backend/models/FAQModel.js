const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
    number: { type: Number },
  },
  {
    timestamps: true,
  }
);

const FAQ = mongoose.model("FAQ", FAQSchema);

module.exports = FAQ;
