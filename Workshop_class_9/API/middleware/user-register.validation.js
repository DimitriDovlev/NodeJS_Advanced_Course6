const Joi = require("joi");

const userSchema = Joi.object({
  userName: Joi.string().min(3).required(),
  password: Joi.string().min(3).required(),
  role: Joi.string().required(),
});

const userRegisterValidation = (req, res, next) => {
  const userData = req.body;

  const validation = userSchema.validate(userData);

  if (validation?.error) {
    res.status(400).send({
      message: validation.error.details[0].message,
    });
  } else {
    next();
  }
};

module.exports = userRegisterValidation;
