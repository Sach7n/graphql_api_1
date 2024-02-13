const mongoose = require("mongoose");
require("dotenv").config();
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.gd7sngy.mongodb.net/${process.env.MONGO_DB_NAME}`;

const dbConfig = async () => {
  try {
    const connection = await mongoose.connect(uri);
    console.log("Connected to the database");
    return connection.connection; 
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    throw err; 
  }
};

module.exports = dbConfig;
