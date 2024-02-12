const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type Event {
          _id: ID!
          title: String!
          description: String!
          price: Float!
          date: String!
          eventToUserRelationTypeid: String!
        }

        type EventResponse {
            id: ID!
            eventToUserRelationTypeid: String!
          }

        input EventInput {
          title: String!
          description: String!
          price: Float!
          date: String!
          eventToUserRelationTypeid: String!
        }

        type EventError {
          Description: String!
          ErrorType: String!
          Expected: String!
        }

        type CreateEventResponse {
          event: EventResponse
          error: [EventError]
        }

        type User {
          _id: ID!
          email: String!
          password: String
          userToEventRelationTypeid: String
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
    `)