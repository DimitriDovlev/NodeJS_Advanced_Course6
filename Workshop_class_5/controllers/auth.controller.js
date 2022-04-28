const AuthModel = require("../models/auth.model");

class AuthController {
  //Test function
  // 0. Get all users
  static async getAllUsers(req, res) {
    try {
      const users = await AuthModel.getAllUsers();
      res.status(200).send(users);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // 1. Register user
  static async registerUser(req, res) {
    try {
      const userData = req.body;
      const registeredUser = await AuthModel.registerUser(userData);
      res.status(200).send(registeredUser);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // 2. Login user
  static async loginUser(req, res) {
    try {
      const userData = req.body;
      const loggedInUser = await AuthModel.loginUser(userData);

      req.session.loggedIn = true;
      req.session.userId = loggedInUser.id;

      res.status(200).send(loggedInUser);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // 3. Logout user
  static async logoutUser(req, res) {
    try {
    //   console.log(req.session);
      req.session.destroy();
    //   console.log(req.session);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = AuthController;
