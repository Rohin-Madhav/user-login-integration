require('dotenv').config();
const mongoose = require("mongoose");

async function connectDB() {
  try {
    
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Mongoose connected to MongoDB!");
  } catch (error) {
    console.error("Mongoose connection error:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
