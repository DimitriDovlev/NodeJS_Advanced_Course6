const router = require("express").Router();
const OrderController = require("../controllers/order.controller");
const sessionValidator = require("../middleware/session.validation");
const tokenValidation = require("../middleware/token.validation");
const orderLength = require("../middleware/order-length.validation");
const roleValidation = require("../middleware/role.validation");
const orderValidation = require("../middleware/order.validation");

// middleware to check if the user is logged in to use the routes
// router.use(sessionValidator);

//Protect all routes, so only authenticated user can access them
router.use(tokenValidation);

router.use(roleValidation);

//1. Get all Orders
// http://localhost:5000/order/
router.get("/", OrderController.getAllOrder);
//2. Get Order by id
// http://localhost:5000/order/:id
router.get("/:id", OrderController.getOrderById);
//3. Create order
// http://localhost:5000/order/add
router.post("/add", orderLength, orderValidation, OrderController.createOrder);
//4.1 Update order
// http://localhost:5000/order/:id
router.patch("/:id", OrderController.updateOrder);
//4.2 patch the status only
// http://localhost:5000/order/status/:id
router.patch("/status/:id", OrderController.updateStatus);
//5. Delete order
// http://localhost:5000/order/delete/:id
router.delete("/delete/:id", OrderController.deleteOrder);
module.exports = router;
