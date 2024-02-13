const dbConfig = require("../db/db-connection-util");

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
