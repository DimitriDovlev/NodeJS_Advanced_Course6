const express = require("express");
const createSession = require("./const/session.const");
const globalRouter = require("./const/router.const");

const server = express();
server.use(express.json());
server.use(createSession);
server.use(globalRouter);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

server.listen(PORT, HOST, () => {
  console.log(`Server is listening to port ${PORT}`);
});
