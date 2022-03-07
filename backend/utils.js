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
      process.env.JWT_SECRET_ACCESS || "temp_acc",
      {
        expiresIn: "5m",
      }
    );
  } //access토큰 발급
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET_REFRESH || "temp_ref",
    {
      expiresIn: "1d",
    }
  ); //refresh토큰 발급
}

function checkValidToken(token, type = "access") {
  let decodedToken = undefined;
  if (type === "access") {
    jwt.verify(
      token,
      process.env.JWT_SECRET_ACCESS || "temp_acc",
      (error, decoded) => {
        if (error) {
          decodedToken = error.message; //오류 나면 에러 메세지 출력. jwt expired면 access토큰 만료.
          return;
        }
        decodedToken = decoded;
      }
    );
    return decodedToken;
  } //access토큰 확인
  jwt.verify(
    token,
    process.env.JWT_SECRET_REFRESH || "temp_ref",
    (error, decoded) => {
      if (error) {
        decodedToken = error.message;
        return;
      }
      decodedToken = decoded;
    }
  );
  return decodedToken; //refresh토큰 확인
}

exports.generateToken = generateToken;
exports.checkValidToken = checkValidToken;
