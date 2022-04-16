const router = require("express").Router();

const dishRoute = require("../Routes/dish.route");
const orderRoute = require("../Routes/order.route");

//http://localhost:5000/dish
router.use("/dish", dishRoute);
//http://localhost:5000/order
router.use("/order", orderRoute);

module.exports = router;
