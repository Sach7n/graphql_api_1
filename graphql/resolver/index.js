const Event = require("../../models/event");
const User = require("../../models/user");
const userEvent = require("../../models/user-event");
const collect_errors = require("../../helpers/collect-errors");
const { validateEventInput } = require("../../helpers/validate-input");
const { getNextId } = require("../../helpers/generate_ids");
const bcrypt = require("bcryptjs");

module.exports = {
  events: () => {
    return Event.find()
      .then((events) => {
        return events.map((event) => {
          return {
            id:event.id,
            eventToUserRelationTypeid: event.date,
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  _createEvent: async (args, req) => {
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

    let userId;
    if (req && !req.get("user_id")) {
      return {
        error: collect_errors([
          { code: 1004, Description: "User not found/Cannot create an event" },
        ]),
      };
    } else if (req && req.get("user_id")) {
      userId = req.get("user_id") && parseInt(req.get("user_id"), 10);

      const existingUser = await User.findOne({ id: userId });
      if (!existingUser) {
        return {
          error: collect_errors([
            {
              code: 1004,
              Description: "User not found/Cannot create an event",
            },
          ]),
        };
      }
    }

    const userToEvent = new userEvent({
      user_id: userId,
      event_id: eventID,
      date: args.eventInput.date,
      eventToUserRelationTypeid: args.eventInput.eventToUserRelationTypeid,
    });

    try {
      const result = await event.save();
      await userToEvent.save();
      return {
        event: {
          id: result._doc.id,
          eventToUserRelationTypeid: result._doc.date,
        },
        Error: null,
      };
    } catch (err) {
      console.log(err);
      //throw err;
      return {
        error: collect_errors({
          ...err,
          description: err && err.message,
          code: 1000,
        }),
      };
    }
  },
  get createEvent() {
    return this._createEvent;
  },
  set createEvent(value) {
    this._createEvent = value;
  },
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        return { error: collect_errors([{ code: 1003 }]) };
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        id: (await getNextId()) + 1000,
        email: args.userInput.email,
        password: hashedPassword,
      });

      const result = await user.save();

      return {
        User: {
          id: result._doc.id,
          //eventToUserRelationTypeid: result._doc.date,
        },
        Error: null,
      };
    } catch (err) {
      throw err;
    }
  },
};
