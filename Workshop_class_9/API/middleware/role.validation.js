const Joi = require("joi");

const userSchema = Joi.object({});

// Validation for user
const userValidation = (req, res, next) => {
  const userData = req.body;
  console.log(req.headers);

  next();
};

//
const adminValidation = (req, res, next) => {
  const userData = req.body;
  console.log(req);
};

module.exports = userValidation;
