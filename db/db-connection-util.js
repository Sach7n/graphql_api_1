const mongoose = require('mongoose');
require('dotenv').config();

const dbConfig = async () => {
  try {
    const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.gd7sngy.mongodb.net/${process.env.MONGO_DB_NAME}`;
    
    await mongoose.connect(uri);
    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  }
}

  module.exports = dbConfig;