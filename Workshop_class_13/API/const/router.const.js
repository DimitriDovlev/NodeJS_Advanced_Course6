const router = require("express").Router();
const dishRoutes = require("../routes/dish.routes");
const orderRoutes = require("../routes/order.routes");

router.use("/dish", dishRoutes);
router.use("/order", orderRoutes);

module.exports = router;
