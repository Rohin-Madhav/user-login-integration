const mongoose = require("mongoose");

async function connectDB() {
  try {
    const uri =
      "mongodb+srv://rohinmadhavk7:roh321@cluster0.racngkg.mongodb.net";
    await mongoose.connect(uri, {});
    console.log("Mongoose connected to MongoDB!");
  } catch (error) {
    console.error("Mongoose connection error:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
