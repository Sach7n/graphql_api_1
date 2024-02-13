const Event = require("../../models/event");
const User = require("../../models/user");
const collect_errors = require("../../helpers/collect-errors");
const { validateEventInput } = require("../../helpers/validate-input");
const {getNextId} = require('../../helpers/generate_ids')
const dbConfig = require("../../db/db-connection-util");


module.exports = {
  events: () => {
    return Event.find()
      .then((events) => {
        return events.map((event) => {
          return { ...event._doc, _id: event.id };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  _createEvent: async (args) => {
    const errors = validateEventInput(args.eventInput);

    if (errors.length > 0) {
      return { error: collect_errors(errors) };
    }

    const eventID = await getNextId();
    const event = new Event({
      id: eventID,
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      eventToUserRelationTypeid: args.eventInput.eventToUserRelationTypeid,
    });

    try {
      const result = await event.save();
      return {
        event: {
          id: result._doc._id,
          eventToUserRelationTypeid: result._doc.date,
        },
        Error: null,
      };
    } catch(err) {
      console.log(err);
      //throw err;
      return { error: collect_errors({...err,description: err && err.message,code:1000}) };
    }
  },
  get createEvent() {
    return this._createEvent;
  },
  set createEvent(value) {
    this._createEvent = value;
  },
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
};
