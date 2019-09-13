const { ApolloServer } = require('apollo-server');

// The schema for object type definitions 
const typeDefs = `
  type Query {

  }
`;

// Resolvers are only called when data is requested
const resolvers = {
  Query: {

  }
};

// Constructs the server
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// Starts the basic apollo server
server.listen(3333).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
