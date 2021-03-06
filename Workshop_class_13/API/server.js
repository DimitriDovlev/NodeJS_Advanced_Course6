require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const globalRouter = require("./const/router.const");

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.xnoxz.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

const server = express();

server.use(express.json());
server.use(globalRouter);

mongoose.connect(MONGO_URI, (error) => {
  if (error) return console.log(error);

  console.log("Connected to MongoDB");

  server.listen(process.env.PORT, process.env.HOST, () => {
    console.log(process.env.HOST);
    console.log(`Server is up at port:${process.env.PORT}`);
  });
});
