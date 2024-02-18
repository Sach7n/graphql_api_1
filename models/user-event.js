const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userEventSchema = new Schema({
  user_id: {
    type: Number,
    required: true
  },
  event_id: {
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

module.exports = mongoose.model('userEvent', userEventSchema);