const router = require("express").Router();

const dishRoute = require("../Routes/dish.route");

//http://localhost:5000/dish
router.use("/dish", dishRoute);

module.exports = router;
