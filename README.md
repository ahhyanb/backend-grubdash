# 🍔 GrubDash Backend API

A RESTful backend API for GrubDash, a food delivery platform. This project manages dishes and orders, providing full CRUD functionality and robust validation to ensure data integrity.

## 🚀 Features

- **CRUD Operations**: Create, Read, Update, and Delete for dishes and orders
- **Data Validation**: Ensures all required fields are present and correctly formatted
- **Middleware Architecture**: Modular middleware functions for logging, error handling, and validation
- **RESTful Routing**: Clean and organized routing structure following REST principles
- **In-Memory Data**: Uses in-memory storage for simplicity and ease of testing

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Version Control**: Git & GitHub

## 📁 Project Structure

backend-grubdash/
├── src/
│ ├── controllers/ # Business logic for dishes and orders
│ ├── data/ # In-memory data storage
│ ├── errors/ # Custom error handling
│ ├── middleware/ # Validation and error-handling middleware
│ ├── routes/ # Express route definitions
│ └── app.js # Entry point of the application
├── package.json
└── README.md

bash
Copy
Edit

## 🧪 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ahhyanb/backend-grubdash.git
   cd backend-grubdash
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm run start:dev
The server will start on http://localhost:5000.

## 📬 API Endpoints
### Dishes
GET /dishes - Retrieve a list of all dishes
POST /dishes - Create a new dish
GET /dishes/:dishId - Retrieve a specific dish by ID
PUT /dishes/:dishId - Update an existing dish
DELETE /dishes/:dishId - Delete a dish by ID

### Orders
GET /orders - Retrieve a list of all orders
POST /orders - Create a new order
GET /orders/:orderId - Retrieve a specific order by ID
PUT /orders/:orderId - Update an existing order
DELETE /orders/:orderId - Delete an order by ID

## 🔍 Validation Rules
Dishes: Must include name, description, price (integer > 0), and image_url
Orders: Must include deliverTo, mobileNumber, and at least one dish with a valid quantity

## 📄 License
This project is licensed under the MIT License.

Built with ❤️ by ahhyanb
