const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema(
  {
    order: Number,
    ad: { data: Buffer, contentType: String, link: String },
  },
  {
    timestamps: true,
  }
);

const Promotion = mongoose.model("Promotion", promotionSchema);
module.exports = Promotion;
