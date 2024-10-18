// In the src/dishes/dishes.controller.js file, 
// add handlers and middleware functions 
// to create, read, update, and list dishes. 
// Note that dishes cannot be deleted.

const path = require("path");
// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));
// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");


// TODO: Implement the /dishes handlers needed to make the tests pass

// gets the list of dishes
function listDishes(req, res){
  res.status(200).json({ data: dishes });
}
// Updates the dish
function updateDish(req, res, next) {
  const { dishId } = req.params; // Extract the dishId from the route
  const { data: { 
                  id,
                  name,
                  description,
                  price,
                  image_url
                  } = {} 
        } = req.body; // Destructure the req body
  // Find the dish by its dishId from the route
  const findDish = dishes.find((dish) => dish.id === dishId);
  // If there's no matching dish, log an error
  if (!findDish) {
    return res.status(404).json({ error: `No matching dish for dish ID ${dishId}.` });
  }
  // Validation checks
   if (id && id !== dishId) {
    return res.status(400).json({ error: `Dish id does not match route id. Dish: ${id}, Route: ${dishId}.` });
  }
  if (!name || name === "") {
    return res.status(400).json({ error: "Dish must include a name" });
  }
  if (!description || description === "") {
    return res.status(400).json({ error: "Dish must include a description" });
  }
  if (price === undefined || price <= 0 || !Number.isInteger(price)) {
    return res.status(400).json({
      error: "Dish must have a price that is an integer greater than 0",
    });
  }
  if (!image_url || image_url === "") {
    return res.status(400).json({ error: "Dish must include an image_url" });
  // reassign the found dish's properties
  findDish.name = name;
  findDish.description = description;
  findDish.price = price;
  findDish.image_url = image_url;
  // Respond with the updated dish
  return res.status(200).json({ data: findDish });
}

// create a new dish with an id
function createDish(req, res) {
  const { data: { name, description, price, image_url } = {} } = req.body; // Destructure the request body
  
  // Validation checks
  if (!name || name === "") {
    return res.status(400).json({ error: "Dish must include a name" });
  }
  if (!description || description === "") {
    return res.status(400).json({ error: "Dish must include a description" });
  }
  if (price === undefined) {
    return res.status(400).json({ error: "Dish must include a price" });
  }
  if (price <= 0 || !Number.isInteger(price)) {
    return res.status(400).json({ error: "Dish must have a price that is an integer greater than 0" });
  }
  if (!image_url || image_url === "") {
    return res.status(400).json({ error: "Dish must include an image_url" });
  }
  // Create a new dish object
  const newDish = { 
    id: nextId(), // use the nextId() in the utils
    name,
    description,
    price,
    image_url
  };
  // adds new data to the dishes
  dishes.push(newDish);
  // Respond with the newly created dish and a 201 status
  return res.status(201).json({ data: newDish });
}

function dishesById(req, res) {
  const { dishId } = req.params; // extract the dish id from the route
  const findDish = dishes.find((dish) => dish.id === dishId);
  if (!findDish) {
    return res.status(404).json({ error: `No matching dish found for ID ${dishId}` });
  }
  return res.status(200).json({ data: findDish });
}


module.exports = { 
  listDishes,
  createDish,
  dishesById,
  updateDish
};