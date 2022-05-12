const Dish = require("../models/dish.model");
const OrderService = require("../services/order.service");

class DishService {
  //1 Get all dishes
  static async getAllDishes() {
    const dishes = await Dish.find({});
    return dishes;
  }
  //2 Get dish by id
  static async getDishById(dishId) {
    const foundDish = await Dish.findById(dishId).populate("orders");
    return foundDish;
  }
  //3 Create dish
  static async addDish(dishData) {
    const dish = new Dish(dishData);


    const newDish = await dish.save();

    return newDish;
  }
  //4 Update dish
  static async updateDish(dishId, dishData) {
    const dish = await this.getDishById(dishId);

    const updateKeys = Object.keys(dishData);

    updateKeys.forEach((key) => {
      dish[key] = dishData[key];
    });

    await dish.save();

    return dish;
  }
  //5 Delete dish
  static async deleteDish(dishId) {
    const dish = await Dish.findByIdAndDelete(dishId);
    return dish;
  }
}

module.exports = DishService;
