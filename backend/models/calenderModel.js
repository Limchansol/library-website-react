const mongoose = require("mongoose");

const calenderSchema = new mongoose.Schema({
  redDay: { type: Array },
  orangeDay: { type: Array },
  eventDay: { type: Array },
});

const Calender = mongoose.model("Calender", calenderSchema);

module.exports = Calender;
