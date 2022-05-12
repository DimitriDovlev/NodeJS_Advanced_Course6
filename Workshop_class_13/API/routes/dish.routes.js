const router = require("express").Router();
const DishController = require("../controllers/dish.controller");

//1 Get all dishes
//localhost:3000/dish/
router.get("/", DishController.getAllDishes);

//2 Get dish by id
//localhost:3000/dish/:id
router.get("/:id", DishController.getDishById);

//3 Create dish
//localhost:3000/dish/
router.post("/", DishController.addDish);

//4 Update dish
//localhost:3000/dish/:id
router.patch("/:id", DishController.updateDish);

//5 Delete dish
//localhost:3000/dish/
router.delete("/:id", DishController.deleteDish);

module.exports = router;
