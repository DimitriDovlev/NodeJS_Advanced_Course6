const router = require("express").Router();
const PostsController = require("../controllers/posts.controller");
const roleValidation = require("../middleware/user-role.validation");

// /posts routes that handles GET/POST/PUT/DELETE calls
// http://localhost:5000/posts

// 1. Get all posts
// http://localhost:5000/posts/
router.get("/", PostsController.getAllPosts);

// 2. Get post by id
// http://localhost:5000/posts/:id
router.get("/:id", PostsController.getPostById);

// 3. Add postc
// http://localhost:5000/posts/addPost
router.post("/addPost", PostsController.addPost);

// 4. Update post
// http://localhost:5000/posts/:id
router.patch("/:id", roleValidation.validateRole, PostsController.updatePost);
// 5. Delete post
// http://localhost:5000/posts/:id
router.delete("/:id", roleValidation.validateRole, PostsController.deletePost);

module.exports = router;
