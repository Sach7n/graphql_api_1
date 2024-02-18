const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type Event {
          id: Int!
          title: String
          description: String
          price: Float
          date: String
          eventToUserRelationTypeid: String
        }

        type EventResponse {
            id: Int!
            eventToUserRelationTypeid: String!
          }

        input EventInput {
          title: String!
          description: String!
          price: Float!
          date: String!
          eventToUserRelationTypeid: String!
        }

        type Error {
          Description: String!
          ErrorType: String!
          Expected: String!
        }

        type CreateEventResponse {
          event: EventResponse
          error: [Error]
        }

        type User {
          id: Int!
          email: String!
          password: String
          userToEventRelationTypeid: String
        }

        input UserInput {
          email: String!
          password: String!
        }

        type UserResponse {
          id: Int!
          userToEventRelationTypeid: String
        }

        type CreateUserResponse {
          User: UserResponse
          error: [Error]
        }

        type RootQuery {
          events: [Event!]!
        }

        type RootMutation {
          createEvent(eventInput: EventInput): CreateEventResponse
          createUser(userInput: UserInput): CreateUserResponse
        }

        schema {
          query: RootQuery
          mutation: RootMutation
        }
    `)