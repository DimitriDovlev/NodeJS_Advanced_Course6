const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  dishes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dish",
      required: true,
    },
  ],
  status: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
