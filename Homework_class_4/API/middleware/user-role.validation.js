const DataService = require("../services/data.service");
const path = require("path");
const usersPath = path.join(__dirname, "..", "data", "users.json");

async function validateRole(req, res, next) {
  const users = await DataService.readJSONFile(usersPath);

  console.log(req.session);

  const loggedIn = req.session.loggedIn;
  const userId = req.session.userId;

  const foundUser = users.find((user) => user.id === userId);
  const userRole = foundUser.role;

  console.log(loggedIn);
  console.log(userId);
  if (!(userRole === "admin")) {
    res.status(400).send({ message: "No permision" });
  } else {
    next();
  }
}

module.exports = validateRole;
