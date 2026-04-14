const mongoose = require("mongoose");
// Load environment variables from .env file
require("dotenv").config();

// Get the MongoDB connection string from environment variables
const db = process.env.MONGO_URI;

//Connect to mongodb database using mongoose
const connectDB = async () => {
  try {
    // Attempt to connect to the database
    await mongoose.connect(db);

    console.log("MongoDB Connected...");
  } catch (err) {
    // Log the error message and exit the process if connection fails
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;