const DataService = require("../services/data-services");
const { v4: uuid } = require("uuid");
const path = require("path");
const bcrypt = require("bcryptjs");

const usersDataPath = path.join(__dirname, "..", "data", "users.json");

class User {
  constructor(userName, password, role) {
    this.id = uuid();
    this.userName = userName;
    this.password = password;
    this.role = role;
  }
}

class AuthModel {
  //Test function
  // 0. Get all users
  static async getAllUsers() {
    const users = await DataService.readJSONFile(usersDataPath);
    return users;
  }
  // 1. Register user
  static async registerUser(userData) {
    const users = await this.getAllUsers();

    // Check if the user entered id while registering
    if (userData.id) return Promise.reject({ message: "Invalid entry" });

    // Check if the user exists by finding the userName in the db
    const userExists = users.some(
      (user) => user.userName === userData.userName
    );
    if (userExists) return Promise.reject({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(userData.password, 8);

    const newUser = {
      ...new User(userData.userName, hashedPassword, userData.role),
    };
    const updatedUserDb = [...users, newUser];
    await DataService.saveJSONFile(usersDataPath, updatedUserDb);

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  // 2. Login user
  static async loginUser(userData) {
    const users = await this.getAllUsers();
    const userPassword = userData.password;
    const userName = userData.userName;

    const foundUser = users.find((user) => user.userName === userName);
    const passwordValidate = await bcrypt.compare(
      userPassword,
      foundUser.password
    );

    if (!foundUser || !passwordValidate)
      return Promise.reject({ message: "Invalid entry" });

    const { password, ...userWithoutPassword } = foundUser;

    return userWithoutPassword;
  }

}

module.exports = AuthModel;
