const mongoose = require("mongoose");

const cafeMenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  type: { type: String, required: true },
});

const CafeMenu = mongoose.model("CafeMenu", cafeMenuSchema);

module.exports = CafeMenu;
