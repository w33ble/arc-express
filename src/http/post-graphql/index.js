const arc = require('@architect/functions');
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

// fix the request method
app.use((req, res, next) => {
  console.log('original:', req.method, req.url);
  req.method = 'POST';
  console.log('updated:', req.method, req.url);
  next();
});

server.applyMiddleware({ app, path: '/' });

exports.handler = arc.http.express(app);
