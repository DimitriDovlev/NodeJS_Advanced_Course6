const OrderService = require("../services/order.service");

class OrderController {
  //1 Get all orders
  static async getAllOrders(req, res) {
    try {
      const orders = await OrderService.getAllOrders();
      res.status(200).send(orders);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //2 Get order by id
  static async getOrderById(req, res) {
    try {
      const { id: orderId } = req.params;
      const order = await OrderService.getOrderById(orderId);
      res.status(200).send(order);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //3 Create order
  static async addOrder(req, res) {
    try {
      const orderData = req.body;
      const newOrder = await OrderService.addOrder(orderData);
      res.status(200).send(newOrder);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //4 Update order
  static async updateOrder(req, res) {
    try {
      const { id: orderId } = req.params;
      const orderData = req.body;
      const updatedOrder = await OrderService.updateOrder(orderId, orderData);
      res.status(200).send(updatedOrder);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //5 Delete Order
  static async deleteOrder(req, res) {
    try {
      const { id: orderId } = req.params;
      const deletedOrder = await OrderService.deleteOrder(orderId);
      res.status(200).send(deletedOrder);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}

module.exports = OrderController;
