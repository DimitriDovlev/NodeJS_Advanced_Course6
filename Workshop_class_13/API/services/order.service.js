const Order = require("../models/order.model");
const DishService = require("../services/dish.service");

class OrderService {
  //1 Get all orders
  static async getAllOrders() {
    const orders = await Order.find({});
    return orders;
  }
  //2 Get order by id
  static async getOrderById(orderId) {
    const order = await Order.findById(orderId).populate("dishes");
    return order;
  }
  //3 Create order
  static async addOrder(orderData) {
    const order = new Order(orderData);

    const dishes=orderData.dishes.length
    console.log(dishes);
    /* vo createOrder da se povika DishService i da se napravi update operacija na dadeniot dish */
    // await DishService.updateDish()
    // order.dishes.forEach()
    // for (let index = 0; index < dishes; index++) {
    //     const element = orderData.dishes[index];
        
    // }

    // await order.save();
    return order;
  }
  //4 Update order
  static async updateOrder(orderId, orderData) {
    const order = await this.getOrderById(orderId);

    const updatedKeys = Object.keys(orderData);

    updatedKeys.forEach((key) => {
      order[key] = orderData[key];
    });

    await order.save();

    return order;
  }
  //5 Delete Order
  static async deleteOrder(orderId) {
    const order = await Order.findByIdAndDelete(orderId);
    return order;
  }
}

module.exports = OrderService;
