const router = require("express").Router();
const OrderController = require("../controllers/order.controller");

//1 Get all orders
//localhost:3000/order/
router.get("/", OrderController.getAllOrders);

//2 Get order by id
//localhost:3000/order/:id
router.get("/:id", OrderController.getOrderById);

//3 Create order
//localhost:3000/order/
router.post("/", OrderController.addOrder);

//4 Update order
//localhost:3000/order/:id
router.patch("/:id", OrderController.updateOrder);

//5 Delete Order
//localhost:3000/order/:id
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;
