const DataService = require("../services/data.service");
const { v4: uuid } = require("uuid");
const path = require("path");

const postsPath = path.join(__dirname, "..", "data", "posts.json");

class PostsModel {
  // 1. Get all posts
  static async getAllPosts() {
    const posts = await DataService.readJSONFile(postsPath);
    return posts;
  }
  // 2. Get post by id
  static async getPostById(postData) {
    const posts = await this.getAllPosts();
    const postId = postData.id;
    const foundPost = posts.find((post) => post.id === postId);
    if (foundPost) {
      return foundPost;
    } else {
      return Promise.reject({ message: "No such post found" });
    }
  }
  // 3. Add post
  static async addPost(postData) {
    const posts = await this.getAllPosts();

    // !(postData.id == undefined)
    if (postData.id) {
      return Promise.reject({ message: "Invalid entry" });
    }
    const newPost = {
      id: uuid(),
      ...postData,
    };
    const updatedPostsDb = [...posts, newPost];

    await DataService.saveJSONFile(postsPath, updatedPostsDb);
    return newPost;
  }

  // 4. Update post
  static async updatePost(postId, postData) {
    const posts = await this.getAllPosts();

    if (postData.id) {
      return Promise.reject({ message: "Invalid entry" });
    }

    const foundPost = posts.find((post) => post.id === postId);
    if (!foundPost) return Promise.reject({ mesage: "No such post found" });

    const updatedPost = {
      ...foundPost,
      ...postData,
    };

    const updatedPostsDb = posts.map((post) =>
      post.id === foundPost.id ? updatedPost : post
    );

    await DataService.saveJSONFile(postsPath, updatedPostsDb);
    return updatedPost;
  }

  // 5. Delete post
  static async deletePost(postId) {
    const posts = await this.getAllPosts();

    const foundPost = posts.find((post) => post.id === postId);

    if (!foundPost) return Promise.reject({ message: "No such post found" });

    const filteredPosts = posts.filter((post) => post.id !== postId);

    if (posts.length === filteredPosts.length)
      return Promise.reject({ message: "No post found" });

    await DataService.saveJSONFile(postsPath, filteredPosts);

    return foundPost;
  }
}

module.exports = PostsModel;
