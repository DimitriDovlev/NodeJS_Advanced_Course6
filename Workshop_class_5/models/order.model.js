const DataService = require("../services/data-services");
const path = require("path");
const { v4: uuid } = require("uuid");
const { saveJSONFile } = require("../services/data-services");

const DishModel = require("./dish.model");

const orderPath = path.join(__dirname, "..", "data", "order.json");

class OrderClass {
  //1. Get all Orders
  static async getAllOrder() {
    return DataService.readJSONFile(orderPath);
  }
  //2. Get Order by id
  static async getOrderById(orderId) {
    const orders = await this.getAllOrder();
    const foundOrder = orders.find((order) => order.id === orderId);

    if (foundOrder) {
      return foundOrder;
    } else {
      return Promise.reject({ message: "No such order exists" });
    }
  }

  //3. Create order
  static async createOrder(orderData) {
    const orders = await this.getAllOrder();
    const dishes = await DishModel.getAllDishes();

    //If the user enters an ID
    if (orderData.id) return Promise.reject({ message: "Invalid entry" });

    const newOrder = {
      id: uuid(),
      ...orderData,
    };
    let temp = false;
    for (let i = 0; i < dishes.length; i++) {
      if (dishes[i].name === newOrder.dishName) {
        const updatedDb = [...orders, newOrder];
        await DataService.saveJSONFile(orderPath, updatedDb);
        return newOrder;
      }
      temp = true;
    }
    if (temp) {
      return Promise.reject({ message: "No such dish exists" });
    }
  }

  //4.1 Update order
  static async updateOrder(orderId, orderData) {
    const orders = await this.getAllOrder();
    const foundOrder = await this.getOrderById(orderId);

    //If the user enters an ID
    if (orderData.id) return Promise.reject({ message: "Invalid entry" });

    const updatedOrder = { ...foundOrder, ...orderData };

    const updatedDb = orders.map((order) =>
      order.id === foundOrder.id ? updatedOrder : order
    );
    await saveJSONFile(orderPath, updatedDb);
    return updatedOrder;
  }
  //4.2 patch the status only
  static async updateStatus(orderId, orderData) {
    const orders = await this.getAllOrder();
    const foundOrder = await this.getOrderById(orderId);
    const updateStatus = orderData;

    foundOrder.status = orderData;
    const updatedStatus = { ...foundOrder };

    console.log("updatedStatus: ", updatedStatus);
    const updatedDb = orders.map((order) =>
      order.id === foundOrder.id ? updatedStatus : order
    );
    await saveJSONFile(orderPath, updatedDb);
    return updateStatus;
  }

  //5. Delete order
  static async deleteOrder(orderId) {
    const orders = await this.getAllOrder();

    const updatedDb = orders.filter((order) => order.id !== orderId);

    if (updatedDb.length === orders.length)
      return Promise.reject({ message: "No such item found" });

    await DataService.saveJSONFile(orderPath, updatedDb);
    return updatedDb;
  }
}

module.exports = OrderClass;
