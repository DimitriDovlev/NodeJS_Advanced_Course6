const Joi = require("joi");

const dishSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().min(1).required(),
});

const dishValidation = (req, res, next) => {
  const dishData = req.body;
  console.log(dishData);
  const validation = dishSchema.validate(dishData);

  if (validation?.error) {
    res.status(400).send({ message: validation.error.details[0].message });
  } else {
    next();
  }
};

module.exports = dishValidation;
