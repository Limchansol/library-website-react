//여러가지 유틸 함수들을 모아놓는 파일

const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "temp_key",
    {
      expiresIn: "30d",
    }
  );
}

exports.generateToken = generateToken;
