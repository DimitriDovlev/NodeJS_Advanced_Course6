const DishModel = require("../Models/dish.model");

class DishController {
  // 1. Get all dish items from the DB
  static async getAllDishes(req, res) {
    try {
      const dishes = await DishModel.getAllDishes();
      res.status(200).send(dishes);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // 2. Get dish by id
  static async getDishById(req, res) {
    try {
      const { id: dishId } = req.params;
      const getDish = await DishModel.getDishById(dishId);
      res.status(200).send(getDish);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // 3. Add new dish
  static async addNewDish(req, res) {
    try {
      const newDish = req.body;
      const createDish = await DishModel.addNewDish(newDish);
      res.status(200).send(createDish);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // 4. Edit
  static async updateDish(req, res) {
    try {
      const dish = req.body;
      const { id: dishId } = req.params;
      const updatedDish = await DishModel.updateDish(dishId, dish);
      res.status(200).send(updatedDish);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  // 5. Delete
  static async deleteDish(req, res) {
    try {
      const { id: dishId } = req.params;
      const deleteDish = await DishModel.deleteDish(dishId);
      res.status(200).send(deleteDish);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

module.exports = DishController;
