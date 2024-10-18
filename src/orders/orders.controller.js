const path = require("path");
// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));
// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");


// TODO: Implement the /orders handlers needed to make the tests pass
function getOrdersList(req, res) {
  res.status(200).json({ data: orders });
}

// validation function to use for the other methods
function validateOrder(req, res, next) {
  const { deliverTo, mobileNumber, dishes } = req.body.data || {};
  // Validate deliverTo
  if (!deliverTo || deliverTo === "") {
    return res.status(400).json({ error: "Order must include a deliverTo" });
  }
  // Validate mobileNumber
  if (!mobileNumber || mobileNumber === "") {
    return res.status(400).json({ error: "Order must include a mobileNumber" });
  }
  // Validate dishes
  if (!dishes) {
    return res.status(400).json({ error: "Order must include a dish" });
  } else if (!Array.isArray(dishes) || dishes.length === 0) {
    return res.status(400).json({ error: "Order must include at least one dish" });
  }
  // Validate each dish's quantity
  for (let i = 0; i < dishes.length; i++) {
    const dish = dishes[i];
    if (!dish.quantity || dish.quantity <= 0 || !Number.isInteger(dish.quantity)) {
      return res.status(400).json({ error: `Dish ${i} must have a quantity that is an integer greater than 0` });
    }
  }
  // If all validations pass, call next() to move on to the next middleware
  next();
}

// creates a new order using the req.body
function createOrder(req, res) {
  const { deliverTo, mobileNumber, dishes } = req.body.data;
  // If all validations pass, create the new order
  const newOrder = { 
    id: nextId(),
    deliverTo,
    mobileNumber,
    dishes,
  };
  // Add the new order to the orders array
  orders.push(newOrder);
  // Respond with the newly created order
  return res.status(201).json({ data: newOrder });
}

// looks for the order by the orderId from the route
function orderByOrderId(req, res) {
  const { orderId } = req.params;
  const findOrder = orders.find((order) => order.id === orderId);
  if (!findOrder) {
    return res.status(404).json({ error: "No matching order found" });
  }
  return res.status(200).json({ data: findOrder });
}

// updates the orderId from route
function updateOrder(req, res) {
  const { orderId } = req.params;
  const { deliverTo, mobileNumber, status, dishes } = req.body.data;
  // Find the order by id
  const findOrder = orders.find((order) => order.id === orderId);
  // Check if the order exists
  if (!findOrder) {
    return res.status(404).json({ error: `Order with ID ${orderId} not found.` });
  }
  // Check if the body contains an id that doesn't match the route id
  if (req.body.data.id && req.body.data.id !== orderId) {
    return res.status(400).json({ error: `Order id does not match route id. Order: ${req.body.data.id}, Route: ${orderId}.` });
  }
  // Validate status: missing or empty should return the same error message
  if (!status || status === "") {
    return res.status(400).json({ error: "Order must have a status of pending, preparing, out-for-delivery, delivered" });
  }
  // Validate that status is one of the valid statuses
  const validStatuses = ["pending", "preparing", "out-for-delivery", "delivered"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status. Status must be one of pending, preparing, out-for-delivery, or delivered." });
  }
  // Check if the status of the existing order is "delivered"
  if (findOrder.status === "delivered") {
    return res.status(400).json({ error: "A delivered order cannot be changed." });
  }
    // reassign or update using the req.body
    findOrder.deliverTo = deliverTo;
    findOrder.mobileNumber = mobileNumber;
    findOrder.dishes = dishes;
  
  return res.status(200).json({ data: findOrder });  
}

// deletes an order
function deleteOrder(req, res) {
  const { orderId } = req.params;
  // Find the index of the order by id
  const orderIndex = orders.findIndex((order) => order.id === orderId);
  // Check if the order exists
  if (orderIndex === -1) {
    return res.status(404).json({ error: `No matching order found for order ID ${orderId}` });
  }
  // Check if the order's status is "pending"
  if (orders[orderIndex].status !== "pending") {
    return res.status(400).json({ error: "An order cannot be deleted unless it is pending" });
  }
  // Remove the order from the array using splice()
  orders.splice(orderIndex, 1);
  // Return a 204 status for successful deletion with no content
  return res.sendStatus(204);
}



module.exports = {
  getOrdersList,
  create: [validateOrder, createOrder],
  orderByOrderId,
  update: [validateOrder, updateOrder],
  deleteOrder
};



