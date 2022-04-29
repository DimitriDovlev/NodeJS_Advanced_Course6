const AuthModel = require("../models/auth.model");

class SessionValidation {
  static async sessionValidator(req, res, next) {
    const loggedIn = req.session.loggedIn;
    const userId = req.session.userId;
    const user = await AuthModel.getUserById(userId);
    let userRole = user.role;
    const method = req.method;
    if (loggedIn && userRole === "admin") {
      next();
    } else if (loggedIn && userRole === "user" && (method === "GET" || method === "POST")) {
      next();
    } else {
      // res.status(403).send({ message: "User is not logged in" });
      res.sendStatus(403)
    }
  }
}
module.exports = SessionValidation;
