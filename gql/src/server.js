const { ApolloServer } = require('apollo-server');
const fetch = require('./fetch.js');
const { get } = require('lodash');

// The schema for object type definitions 
const typeDefs = `
  type Currencies {
    currencies: [String]
  }

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
    rates_latest(amount: Float, base: String, symbols: String): Rates
    list_currencies: Currencies
  }
`;

// Resolvers are only called when data is requested
const resolvers = {
  Query: {
    rates_latest: async(_, params) => {
      return {
        data: await fetch.build(`${ process.env.EXCHANGE_RATE_API }/latest`, { ...params }).then(res => res.json()),
        params
      }
    },
    list_currencies: async(_, params) => fetch.build(`${ process.env.EXCHANGE_RATE_API }/latest`, params).then(res => res.json())
  },
  Currencies: {
    currencies: (data) => Object.keys(get(data, 'rates', {}))
  },
  Rates: {
    base: ({ data }) => get(data, 'base', null),
    date: ({ data }) => get(data, 'date', null),
    rates: ({ data, params }) => {
      const rates = get(data, 'rates', {});
      const amount = get(params, 'amount', false);

      // Tranform rates into an array
      return Object.keys(rates).map(currency => {
        return {
          currency,
          rate: amount ? parseFloat(rates[currency]) * parseFloat(amount) : rates[currency]
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
