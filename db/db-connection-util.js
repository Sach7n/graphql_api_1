const mongoose = require('mongoose');
require('dotenv').config();

const dbConfig = mongoose
.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.gd7sngy.mongodb.net/${process.env.MONGO_DB_NAME}`
  )
  .then(()=>{
    console.log('connected to database')
  })
  .catch(err => {
    console.log(err);
  });

  module.exports = dbConfig;