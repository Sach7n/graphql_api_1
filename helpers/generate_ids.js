const dbConfig = require("../db/db-connection-util");


async function getNextEventId() {
    const result = await dbConfig.counters.findAndModify({
       query: { _id: "eventId" },
       update: { $inc: { sequence_value: 1 } },
       new: true
    });
 
    return result.value.sequence_value;
 }

 module.exports = {getNextEventId};