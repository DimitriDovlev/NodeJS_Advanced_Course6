require("dotenv").config();

console.log(process.env.ACCESS_TOKEN_SECRET);
console.log(process.env.REFRESH_TOKEN_SECRET);

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const globalRouter = require("./const/router.const");

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(globalRouter);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

server.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
