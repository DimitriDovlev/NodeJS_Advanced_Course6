const Joi = require("joi");
const { verifyAccessToken, verifyRefreshToken } = require("../const/jwt.const");
const AuthModel = require("../models/auth.model");

const userSchema = Joi.object({});

// Validation for user
const roleValidation = async (req, res, next) => {
  console.log("Method: ", req.method);
  console.log(req.method=="GET");
  const method=req.method;
  const authorizationHeader = req.headers.authorization;
  console.log("Auth: ", authorizationHeader);
  const userToken = authorizationHeader.split(" ")[1];
  console.log("User token: ", userToken);
  const { userId } = verifyAccessToken(userToken);
  const user = await AuthModel.getUserById(userId);
  console.log(userId);
  console.log(user);

  const userRole = user.role;
  console.log(userRole);

  if (userRole == "Admin") {
    console.log("inside the if");
    next();
  }else if(userRole=="User" && (method=="GET")){
    console.log("inside the second if");
    next();
  }else{
    return res.sendStatus(403);
  }
  // next();
};

module.exports = roleValidation;
