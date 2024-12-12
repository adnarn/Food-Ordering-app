const express = require('express');
const multer = require('multer');
const { addFood, listFood, removeFood } = require('../controllers/foodController');
const verifyToken = require('../middlewares/verifyToken')

const foodRouter = express.Router();

// Image storage
const storage = multer.diskStorage({
    destination: "uploads",  // Ensure this folder exists
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`); 
    }
});

const upload = multer({ storage: storage });

// Corrected: POST route to add food, ensuring "image" matches the form field name
foodRouter.post('/add', upload.single("image"), addFood);
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood);

module.exports = foodRouter;
