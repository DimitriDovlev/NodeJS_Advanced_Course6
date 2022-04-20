const router = require("express").Router();
const authRouter = require("../routes/auth.routes");
const postsRouter = require("../routes/posts.routes");

// /auth route that handles login/register
// http://localhost:5000/auth
router.use("/auth", authRouter);

// /posts routes that handles GET/POST/PUT/DELETE calls
// http://localhost:5000/posts
router.use("/posts", postsRouter);

module.exports = router;
