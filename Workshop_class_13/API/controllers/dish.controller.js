const DishService = require("../services/dish.service");

class DishController {
  //1 Get all dishes
  static async getAllDishes(req, res) {
    try {
      const dishes = await DishService.getAllDishes();
      res.status(200).send(dishes);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //2 Get dish by id
  static async getDishById(req, res) {
    try {
      const { id: dishId } = req.params;
      const foundDish = await DishService.getDishById(dishId);
      res.status(200).send(foundDish);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //3 Create dish
  static async addDish(req, res) {
    try {
      const dishData = req.body;
      const newDish = await DishService.addDish(dishData);
      res.status(200).send(newDish);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //4 Update dish
  static async updateDish(req, res) {
    try {
      const { id: dishId } = req.params;
      const dishData = req.body;
      const updatedDish = await DishService.updateDish(dishId, dishData);
      res.status(200).send(updatedDish);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  //5 Delete dish
  static async deleteDish(req, res) {
    try {
      const { id: dishId } = req.params;
      const deletedDish = await DishService.deleteDish(dishId);
      res.status(200).send(deletedDish);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}

module.exports = DishController;
