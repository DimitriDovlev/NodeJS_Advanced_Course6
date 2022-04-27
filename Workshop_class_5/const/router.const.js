const router = require("express").Router();

const dishRoute = require("../routes/dish.routes");
const orderRoute = require("../routes/order.routes");

//http://localhost:5000/dish
router.use("/dish", dishRoute);
//http://localhost:5000/order
router.use("/order", orderRoute);

module.exports = router;
