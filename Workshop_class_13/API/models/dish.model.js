const mongoose = require("mongoose");
const { Schema } = mongoose;

const dishSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  price: {
    type: Number,
    required: true,
    minlength: 1,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
