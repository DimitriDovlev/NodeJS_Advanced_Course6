const { sign, verify } = require("jsonwebtoken");

const createAccessToken = (userId) => {
  return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
const createRefreshToken = (userId) => {
  return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
const verifyAccessToken = (token) => {
  return verify(token, process.env.ACCESS_TOKEN_SECRET);
};
const verifyRefreshToken = (refreshToken) => {
  return verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
};
module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
