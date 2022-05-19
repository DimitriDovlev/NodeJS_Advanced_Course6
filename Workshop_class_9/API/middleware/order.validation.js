const Joi = require("joi");

const orderSchema = Joi.object({
  dishName: Joi.string().required(),
  status: Joi.string().required(),
});

const orderValidation = (req, res, next) => {
  const orderData = req.body;
  console.log(orderData);
  const validation = orderSchema.validate(orderData);

  if (validation?.error) {
    res.status(400).send({ message: validation.error.details[0].message });
  } else {
    next();
  }
};

module.exports = orderValidation;
