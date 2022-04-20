const DataService = require("../services/data.service");
const { v4: uuid } = require("uuid");
const path = require("path");
const bcrypt = require("bcryptjs");

const usersPath = path.join(__dirname, "..", "data", "users.json");

class User {
  constructor(firstName, lastName, age, email, password) {
    this.id = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
    this.password = password;
  }
}

class AuthModel {
  // 0. Get All Users
  static async getAllUsers() {
    const users = await DataService.readJSONFile(usersPath);
    return users;
  }
  // 1. Register User
  static async registerUser(userData) {
    const users = await this.getAllUsers();

    // The some() method tests whether at least one element in the array passes the test implemented by the provided function.
    const userExists = users.some((user) => user.email === userData.email);
    if (userExists) return Promise.reject({ message: "Email is taken" });

    const hashedPassword = await bcrypt.hash(userData.password, 8);

    const newUser = new User(
      userData.firstName,
      userData.lastName,
      userData.age,
      userData.email,
      hashedPassword
    );

    const updatedUserDb = [...users, newUser];

    await DataService.saveJSONFile(usersPath, updatedUserDb);

    // Take out the password from new user, and return all other parameters within userWithoutPassword
    // The password here refers to the hashed version
    const { password, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }

  // 2. Login User
  static async loginUser(userData) {
    const users = await this.getAllUsers();
    const userEmail = userData.email;
    const userPassword = userData.password;

    const foundUser = users.find((user) => user.email === userEmail);
    const passwordValidate = await bcrypt.compare(
      userPassword,
      foundUser.password
    );
    if (!foundUser || !passwordValidate)
      return Promise.reject({ message: "Invalid entry" });

    const { password, ...userWithoutPassword } = foundUser;
    // console.log(userWithoutPassword);
    return userWithoutPassword;
  }
}

module.exports = AuthModel;
