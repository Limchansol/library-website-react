const mongoose = require("mongoose");

const utilSchema = new mongoose.Schema({
  movieSeason: { type: Number },
});

const Util = mongoose.model("Util", utilSchema);
module.exports = Util;
//자잘한 정보들 모아놓는 장소
