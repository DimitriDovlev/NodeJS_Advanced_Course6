const router = require("express").Router();

const dishRoutes = require("../routes/dish.routes");
const orderRoutes = require("../routes/order.routes");
const authRoutes = require("../routes/auth.routes");

//http://localhost:5000/dish
router.use("/dish", dishRoutes);
//http://localhost:5000/order
router.use("/order", orderRoutes);
//http://localhost:5000/auth
router.use("/auth", authRoutes);

module.exports = router;
