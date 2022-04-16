const DataService = require("../services/data-services");
const path = require("path");
const { v4: uuid } = require("uuid");

const dishPath = path.join(__dirname, "..", "data", "dish.json");

class DishModel {
  // 1. Get all dish items from the DB
  static async getAllDishes() {
    return DataService.readJSONFile(dishPath);
  }
  // 2. Get dish by id
  static async getDishById(dishId) {
    const dishes = await this.getAllDishes();

    const foundDish = dishes.find((dish) => dish.id === dishId);
    console.log(foundDish);
    if (foundDish) {
      return foundDish;
    } else {
      return Promise.reject({ message: "No such dish found" });
    }
  }
  // 3. Add new dish
  static async addNewDish(dishData) {
    const dishes = await this.getAllDishes();

    const newDish = {
      id: uuid(),
      ...dishData,
    };
    if (dishData.price > 1000 || dishData.price < 1)
      return Promise.reject({
        message: "Price needs to be between 1 and 1000",
      });

    const updatedDb = [...dishes, newDish];

    await DataService.saveJSONFile(dishPath, updatedDb);
    return newDish;
  }
  // 4. Edit
  static async updateDish(dishId, dishData) {
    const dishes = await this.getAllDishes();
    const foundDish = await this.getDishById(dishId);

    const updatedItem = { ...foundDish, ...dishData };

    const updatedDb = dishes.map((dish) =>
      dish.id === foundDish.id ? updatedItem : dish
    );
    await DataService.saveJSONFile(dishPath, updatedDb);

    return updatedItem;
  }

  // 5. Delete
  static async deleteDish(dishId) {
    const dishes = await this.getAllDishes();

    const updatedDb = dishes.filter((dish) => dish.id !== dishId);

    if (updatedDb.length === dishes.length)
      return Promise.reject({ message: "No such item found" });

    await DataService.saveJSONFile(dishPath, updatedDb);
    return updatedDb;
  }
}

module.exports = DishModel;
