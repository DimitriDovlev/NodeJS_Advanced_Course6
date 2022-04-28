const AuthModel = require("../models/auth.model");
const {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} = require("../const/jwt.const");

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

      const token = createAccessToken(loggedInUser.id);

      const refreshToken = createRefreshToken(loggedInUser.id);

      await AuthModel.saveRefreshToken(loggedInUser.id, refreshToken);
      res.cookie("refresh-token", refreshToken, {
        httpOnly: false,
        secure: false,
        path: "/refresh-token",
      });
      res.status(200).send({ loggedInUser, token, refreshToken });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // 3. Logout user
  static async logoutUser(req, res) {
    try {
      const userId = req.params.id;
      console.log(req.body);
      await AuthModel.deleteRefreshToken(userId);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // 4. Refresh token
  static async refreshAccessToken(req, res) {
    try {
      const refreshToken = req.body.refreshToken;
      console.log(refreshToken);

      if (!refreshToken) return res.sendStatus(403);
    } catch (error) {
      res.status(403).send(error);
    }
  }
}

module.exports = AuthController;
