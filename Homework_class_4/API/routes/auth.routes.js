const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const sessionValidator = require("../middleware/session.validation");

// router.use(sessionValidator);
// /auth route that handles login/register
// http://localhost:5000/auth

// 0. Get All Users
// http://localhost:5000/auth/getAll
router.get("/getAll", sessionValidator, AuthController.getAllUsers);

// 1. Register User
// http://localhost:5000/auth/register
router.post("/register", AuthController.registerUser);

// 2. Login User
// http://localhost:5000/auth/login
router.post("/login", AuthController.loginUser);

// 3. Logout User
// http://localhost:5000/auth/logout
router.post("/logout", AuthController.logoutUser);

module.exports = router;
