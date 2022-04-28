const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const userRegisterValidation = require("../middleware/user-register.validation");

//Test function
// 0. Get all users
// http://localhost:5000/auth/
router.get("/", AuthController.getAllUsers);
// 1. Register user
// http://localhost:5000/auth/register
router.post("/register", userRegisterValidation, AuthController.registerUser);
// 2. Login user
// http://localhost:5000/auth/login
router.post("/login", AuthController.loginUser);
// 3. Logout user
// http://localhost:5000/auth/logout/:id
router.post("/:id/logout", AuthController.logoutUser);
// 4. Refresh token
// http://localhost:5000/auth/refresh-token
router.post("/refresh-token", AuthController.refreshAccessToken);
module.exports = router;
