const OrderModel = require("../models/order.model");

class OrderController {
  //1. Get all Orders
  static async getAllOrder(req, res) {
    try {
      const orders = await OrderModel.getAllOrder();
      res.status(200).send(orders);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  //2. Get Order by id
  static async getOrderById(req, res) {
    try {
      const { id: orderId } = req.params;
      const getOrder = await OrderModel.getOrderById(orderId);
      res.status(200).send(getOrder);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  //3. Create order
  static async createOrder(req, res) {
    try {
      const order = req.body;
      const newOrder = await OrderModel.createOrder(order);
      res.status(200).send(newOrder);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //4.1 Update order
  static async updateOrder(req, res) {
    try {
      const { id: orderId } = req.params;
      const orderData = req.body;

      const updatedOrder = await OrderModel.updateOrder(orderId, orderData);
      res.status(200).send(updatedOrder);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  //4.2 patch the status only
  static async updateStatus(req, res) {
    try {
      const { id: orderId } = req.params;
      const orderData = req.body.status;
      const updatedStatus = await OrderModel.updateStatus(orderId, orderData);
      res.status(200).send(updatedStatus);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  //5. Delete order
  static async deleteOrder(req, res) {
    try {
      const { id: orderId } = req.params;
      const updatedDb = await OrderModel.deleteOrder(orderId);
      res.status(200).send(updatedDb);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = OrderController;
