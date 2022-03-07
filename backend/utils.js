//여러가지 유틸 함수들을 모아놓는 파일

const jwt = require("jsonwebtoken");

function generateToken(user, type = "access") {
  if (type === "access") {
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET || "temp_key",
      {
        expiresIn: "5m",
      }
    );
  } //access토큰이면 5분 만료시간을 가짐.
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "temp_key",
    {
      expiresIn: "1d",
    }
  ); //refresh토큰이면 1일 만료시간을 가짐. access토큰을 재발급 하는 용도일 뿐, 자원에 대한 접근 기능은 없어야 한다!
}

function checkValidToken(token) {
  let decodedToken = undefined;
  jwt.verify(token, process.env.JWT_SECRET || "temp_key", (error, decoded) => {
    if (error) return error;
    decodedToken = decoded;
  });
  return decodedToken;
}

exports.generateToken = generateToken;
exports.checkValidToken = checkValidToken;
