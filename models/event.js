const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  eventToUserRelationTypeid: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Event', eventSchema);