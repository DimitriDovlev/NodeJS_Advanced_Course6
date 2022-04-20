const AuthModel = require("../models/auth.model");

class AuthController {
  // 0. Get All Users
  static async getAllUsers(req, res) {
    try {
      const users = await AuthModel.getAllUsers();
      res.status(200).send(users);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  // 1. Register User
  static async registerUser(req, res) {
    try {
      const userData = req.body;
      const newUser = await AuthModel.registerUser(userData);

      res.status(200).send(newUser);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  // 2. Login User
  static async loginUser(req, res) {
    try {
      const userData = req.body;
      const loginUser = await AuthModel.loginUser(userData);

      req.session.loggedIn = true;
      req.session.userId = loginUser.id;

      res.status(200).send(loginUser);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // 3. Logout User
  static async logoutUser(req, res) {
    try {
      req.session.destroy();
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = AuthController;
