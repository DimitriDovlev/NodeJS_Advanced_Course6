const router = require("express").Router();
const DishController = require("../controllers/dish.controller");
const sessionValidator = require("../middleware/session.validation");

// middleware to check if the user is logged in to use the routes
router.use(sessionValidator.sessionValidator);
// 1. Get all dish items from the DB
// http://localhost:5000/dish/
router.get("/", DishController.getAllDishes);
// 2. Get dish by id
// http://localhost:5000/dish/:id
router.get("/:id", DishController.getDishById);
// 3. Add new dish
// http://localhost:5000/dish/add
router.post("/add", DishController.addNewDish);
// 4. Edit
// http://localhost:5000/dish/:id
router.patch("/:id", DishController.updateDish);
// 5. Delete
// http://localhost:5000/dish/delete/:id
router.delete("/delete/:id", DishController.deleteDish);
module.exports = router;
