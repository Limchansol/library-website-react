const mongoose = require("mongoose");

const calenderSchema = new mongoose.Schema({
  specialDay: { type: Object },
});

const Calender = mongoose.model("Calender", calenderSchema);

module.exports = Calender;
