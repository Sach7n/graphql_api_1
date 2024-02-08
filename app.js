const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const dbConfig = require('./db/db-connection-util');
const Event = require('./models/event');
const collect_errors  = require('./helpers/collect-errors');
const errors = require('./helpers/dictionary');

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`
        type Event {
          _id: ID!
          title: String!
          description: String!
          price: Float!
          date: String!
        }

        input EventInput {
          title: String!
          description: String!
          price: Float!
          date: String!
        }

        type EventError {
          Description: String!
          ErrorType: String!
          Expected: String!
        }

        type CreateEventResponse {
          event: Event
          error: EventError
        }

        type User {
          _id: ID!
          email: String!
          password: String
        }

        input UserInput {
          email: String!
          password: String!
        }

        type RootQuery {
          events: [Event!]!
        }

        type RootMutation {
          createEvent(eventInput: EventInput): CreateEventResponse
          createUser(userInput: UserInput): User
        }

        schema {
          query: RootQuery
          mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return Event.find()
          .then(events => {
            return events.map(event => {
              return { ...event._doc, _id: event.id };
            });
          })
          .catch(err => {
            throw err;
          });
      },
      _createEvent: (args, req) => {
        let errors;
        if (args && args.eventInput && args.eventInput.title === "testError") {
          ;
          return {error:collect_errors(errors)};
        }
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
          creator: req.headers.user_name,
        });
        return event
          .save()
          .then(result => {
            return {  event: result,error:null};
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      },
      get createEvent() {
        return this._createEvent;
      },
      set createEvent(value) {
        this._createEvent = value;
      },
    },
    graphiql: true,
  })
);

dbConfig.then(() => {
  app.listen(3000);
});
