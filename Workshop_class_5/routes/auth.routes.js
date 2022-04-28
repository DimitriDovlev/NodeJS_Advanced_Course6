const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");

//Test function
// 0. Get all users
// http://localhost:5000/auth/
router.get("/", AuthController.getAllUsers);
// 1. Register user
// http://localhost:5000/auth/register
router.post("/register", AuthController.registerUser);
// 2. Login user
// http://localhost:5000/auth/login
router.post("/login", AuthController.loginUser);
// 3. Logout user
// http://localhost:5000/auth/logout
router.post("/logout", AuthController.logoutUser);
module.exports = router;
