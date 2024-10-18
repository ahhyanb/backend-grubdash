const router = require("express").Router();
const ordersController = require("./orders.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// TODO: Implement the /orders routes needed to make the tests pass

router.route("/")
  .get(ordersController.getOrdersList)
  .post(ordersController.create)
  .all(methodNotAllowed);
  
router.route("/:orderId")
  .get(ordersController.orderByOrderId)
  .put(ordersController.update)
  .delete(ordersController.deleteOrder)
  .all(methodNotAllowed);

module.exports = router;
