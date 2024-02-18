const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const EventUserSchema  = require("./graphql/schema/index");
const EventUserResolver = require("./graphql/resolver/index");
const dbConfig = require("./db/db-connection-util");

// const errors = require("./helpers/dictionary"); // implement this instead of throwing random errorcodes

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP(
    {
    schema: EventUserSchema,
    rootValue: EventUserResolver,
    graphiql: true,
  })
);


dbConfig();
app.listen(3000,()=>{console.log('app listening to 3000')});


