const router = require("express").Router();
const dishesController = require("./dishes.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// TODO: Implement the /dishes routes needed to make the tests pass

router.route("/")
  .get(dishesController.listDishes)
  .post(dishesController.createDish)
  .all(methodNotAllowed);

router.route("/:dishId")
  .get(dishesController.dishesById)
  .put(dishesController.updateDish)
  .all(methodNotAllowed);
  


module.exports = router;
