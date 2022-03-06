const mongoose = require("mongoose");
const dotenv = require("dotenv");
const data = require("./data.js");
const CafeMenu = require("./models/cafeMenuModel.js");
const Calender = require("./models/calenderModel.js");
const FAQ = require("./models/FAQModel.js");
const Movie = require("./models/movieModel.js");
const Util = require("./models/utilModel.js");
const Notice = require("./models/noticeModel.js");
const User = require("./models/userModel.js");
const Book = require("./models/bookModel.js");

dotenv.config();
mongoose.connect(process.env.DB || "mongodb://localhost/minilibrary");

async function insertSeed() {
  try {
    await CafeMenu.insertMany(data.cafeMenu);
    await Calender.insertMany([
      { specialDay: { redDay: [], orangeDay: [], greenDay: [] } },
    ]);
    await FAQ.insertMany(data.rawFAQList);
    await Movie.insertMany(data.programInfo);
    await Notice.insertMany(data.noticeList);
    await User.insertMany(data.users);
    const util = new Util({ movieSeason: 1 });
    util.save();
    await Book.insertMany(data.books);
    console.log("시드 데이터가 잘 입력되었습니다");
  } catch (err) {
    console.log(
      `${err} \n위의 문제로 시드 데이터를 제대로 입력하지 못했습니다. `
    );
  } finally {
    process.exit(0);
  }
}

insertSeed();
