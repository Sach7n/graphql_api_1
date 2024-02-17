const dbConfig = require("../db/db-connection-util");

/**
 * Generates id based on counter document in mongodb
 * 
 * 
 * @returns {number}  next number from the stored number in sequence value
 */

async function getNextId() {
  try {
    const mongooseConnection = await dbConfig();

    const countersCollection = mongooseConnection.collection('counters');

    const result = await countersCollection.findOneAndUpdate(
      { _id: "eventId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    )
    return result.sequence_value;
  } catch (err) {
    throw err;
  }
}

module.exports = { getNextId };
