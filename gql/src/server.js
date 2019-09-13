const { ApolloServer } = require('apollo-server');
const fetch = require('./fetch.js');
const { get } = require('lodash');

// The schema for object type definitions 
const typeDefs = `
  type Rate {
    currency: String
    rate: Float
  }

  type Rates {
    rates: [Rate]
    base: String
    date: String
  }

  type Query {
    exchange_latest(base: String): Rates
  }
`;

// Resolvers are only called when data is requested
const resolvers = {
  Query: {
    exchange_latest: async(_, params) => fetch.build(`${ process.env.EXCHANGE_RATE_API }/latest`, params).then(res => res.json())
  },
  Rates: {
    rates: (data) => {
      const rates = get(data, 'rates', {});

      // Tranform rates into an array
      return Object.keys(rates).map(currency => {
        return {
          currency,
          rate: rates[currency]
        }
      });
    }
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
