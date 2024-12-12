const mongoose = require('mongoose');
require('dotenv').config()

// mongoose.connect('mongodb+srv://adnusy2023:odering123@oderingapp.rlyr6.mongodb.net/FoodOdering')
mongoose.connect('mongodb+srv://adnusy2023:12345dexdash@dexdash.enxr0.mongodb.net/dexDash')
// mongoose.connect('mongodb://localhost:27017/dexDash')

.then( ()  => console.log("connected to database successfully"))
.catch((err) => console.log("connection error"));

module.exports = mongoose;