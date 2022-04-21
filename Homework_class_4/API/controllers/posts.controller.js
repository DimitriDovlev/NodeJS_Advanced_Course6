const PostsModel = require("../models/posts.model");

class PostsController {
  // 1. Get all posts
  static async getAllPosts(req, res) {
    try {
      const posts = await PostsModel.getAllPosts();
      res.status(200).send(posts);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  // 2. Get post by id
  static async getPostById(req, res) {
    try {
      const postData = req.params;
      const postById = await PostsModel.getPostById(postData);

      res.status(200).send(postById);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  // 3. Add post
  static async addPost(req, res) {
    try {
      const postData = req.body;
      const createdPost = await PostsModel.addPost(postData);
      res.status(200).send(createdPost);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // 4. Update post
  static async updatePost(req, res) {
    try {
      const postId = req.params.id;
      const postData = req.body;
      const updatedPost = await PostsModel.updatePost(postId, postData);
      res.status(200).send(updatedPost);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // 5. Delete post
  static async deletePost(req, res) {
    try {
      const postId = req.params.id;
      const deletedPost = await PostsModel.deletePost(postId);
      res.status(200).send(deletedPost);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = PostsController;
