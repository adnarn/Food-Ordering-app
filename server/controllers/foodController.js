const foodModel = require('../models/foodModel');
const fs = require('fs')

const addFood = async (req, res) => {
    // Check if image file exists
    let image_filename = req.file ? req.file.filename : null;

    const food = new foodModel({
        name: req.body.name,
        imgurl: image_filename,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category
    });

    try {
        await food.save();
        res.json({ success: true, message: 'Food Added' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error adding food', error: error.message });
    }
};

//list food

// const listFood = async (req, res) => {
//     const { category } = req.query; // Extract category from query params

//     try {
//         let foods;
//         if (category) {
//             foods = await foodModel.find({ category: category });
//         } else {
//             foods = await foodModel.find();
//         }
//         // Include success field in response
//         res.json({ success: true, data: foods });
//     } catch (error) {
//         console.error('Error fetching foods:', error);
//         res.status(500).json({ success: false, message: 'Error fetching foods', error: error.message });
//     }
// };

// const listFood = async (req, res) => {
//     const { category, search } = req.query; // Extract category and search from query params
  
//     try {
//       let query = {};
  
//       // If a category is provided, add it to the query
//       if (category) {
//         query.category = category;
//       }
  
//       // If a search term is provided, add a case-insensitive regex match for the name
//       if (search) {
//         query.name = { $regex: search, $options: "i" }; // "i" makes it case-insensitive
//       }
  
//       // Fetch foods based on the constructed query
//       const foods = await foodModel.find(query);
  
//       res.json({ success: true, data: foods });
//     } catch (error) {
//       console.error("Error fetching foods:", error);
//       res.status(500).json({ success: false, message: "Error fetching foods", error: error.message });
//     }
//   };

const listFood = async (req, res) => {
  const { category, search } = req.query;

  try {
      let query = { trashed: false }; // Exclude trashed items

      if (category) {
          query.category = category;
      }

      if (search) {
          query.name = { $regex: search, $options: 'i' };
      }

      const foods = await foodModel.find(query);
      res.json({ success: true, data: foods });
  } catch (error) {
      console.error('Error fetching foods:', error);
      res.status(500).json({ success: false, message: 'Error fetching foods', error: error.message });
  }
};


  const listTrashedFoods = async (req, res) => {
    try {
        const trashedFoods = await foodModel.find({ trashed: true });
        res.json({ success: true, data: trashedFoods });
    } catch (error) {
        console.error('Error fetching trashed foods:', error);
        res.status(500).json({ success: false, message: 'Error fetching trashed foods', error: error.message });
    }
};


const restoreFood = async (req, res) => {
  try {
      const food = await foodModel.findById(req.body.id);

      if (!food || !food.trashed) {
          return res.status(404).json({ success: false, message: 'Food not found in trash' });
      }

      // Restore food
      food.trashed = false;
      await food.save();

      res.json({ success: true, message: 'Food restored successfully' });
  } catch (error) {
      console.error('Error restoring food:', error);
      res.status(500).json({ success: false, message: 'Error restoring food', error: error.message });
  }
};


  
  
  const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: 'Food not found' });
        }

        // Move food to trash
        food.trashed = true;
        await food.save();

        res.json({ success: true, message: 'Food moved to trash' });
    } catch (error) {
        console.error('Error moving food to trash:', error);
        res.status(500).json({ success: false, message: 'Error moving food to trash', error: error.message });
    }
};
  const deleteFood = async (req, res) => {
    try {
        const food = await foodModel.findByIdAndDelete(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: 'Food not found' });
        }

        res.json({ success: true, message: 'Food Deleted' });
    } catch (error) {
        console.error('Error deleting food:', error);
        res.status(500).json({ success: false, message: 'Error deleting food', error: error.message });
    }
};


module.exports = { addFood, listFood, removeFood, listTrashedFoods, restoreFood, deleteFood };

