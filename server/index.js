// const express = require("express");
// const bodyParser = require("body-parser"); 
// const cors = require("cors");
// const foodRouter = require('./routes/foodRouter'); 
// const orderRouter = require('./routes/orderRouter');  
// const cartRoutes = require('./routes/cartRouter');  
// const categoryModel = require('./models/categoryModel');
// // const loginRoute = require('./routes/login')
// const db = require('./Config/dbConfig');
// const dotenv = require('dotenv').config()



// const app = express();
// const PORT = 8000;

// // Middlewares
// app.use(express.json());  // Parse incoming JSON data
// app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded data if needed
// app.use(cors());  // Enable CORS

// app.use('/uploads', express.static('uploads'));

// app.use("/api/food", foodRouter);
// app.use("/api/orders", orderRouter);
// app.use('/api/cart', cartRoutes);
// // app.use('/auth', loginRoute);


// // Add a route to fetch categories
// app.get('/api/category', async (req, res) => {
//     try {
//         const categories = await categoryModel.find();  // Fetch all categories from DB
//         res.json(categories);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching categories' });
//     }
// });

// // Add a route to add a category
// app.post('/add-category', (req, res) => {
//     categoryModel.create(req.body)
//     .then(users => res.json(users))
//     .catch(error => res.json(error));
// });

// app.get('/', (req, res) => {
//     res.send('Welcome to the API!');
// });


// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//     // createEmptyCartsForAllUsers()
    
// });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const foodRouter = require("./routes/foodRouter");
const orderRouter = require("./routes/orderRouter");
const cartRoutes = require("./routes/cartRouter");
const categoryModel = require("./models/categoryModel");
const db = require("./Config/dbConfig");
const dotenv = require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json()); // Parse incoming JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data if needed
app.use(cors()); // Enable CORS

app.use("/uploads", express.static("uploads"));

app.use("/api/food", foodRouter);
app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRoutes);

// Add a route to fetch categories
app.get("/api/category", async (req, res) => {
  try {
    const categories = await categoryModel.find(); // Fetch all categories from DB
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});

// Add a route to add a category
app.post("/add-category", (req, res) => {
  categoryModel
    .create(req.body)
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

// Default route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Use PORT from environment variables (Render dynamically assigns this)
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
