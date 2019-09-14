import { ApolloServer } from 'apollo-server';
import fetch from './fetch.js';
import { get } from 'lodash';

// The schema for object type definitions 
const typeDefs = `
  type Currencies {
    currencies: [String]
  }

  type HistoricalRate {
    rate: Float
    date: String
  }

  type HistoricalRates {
    rates: [HistoricalRate]
    base: String
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
    rates_historical(base: String, foreign: String, start_at: String, end_at: String) : HistoricalRates
    rates_latest(amount: Float, base: String, symbols: String): Rates
    list_currencies: Currencies
  }
`;

// Resolvers are only called when data is requested
const resolvers = {
  Query: {
    rates_historical: async(_, params) => {
      const {
        base,
        foreign,
        start_at,
        end_at
      } = params;

      const data = await fetch.build(`${ process.env.EXCHANGE_RATE_API }/history`, {
        base, start_at, end_at, symbols: foreign
      }).then(res => res.json());
      return { data, params };
    },
    rates_latest: async(_, params) => {
      return {
        data: await fetch.build(`${ process.env.EXCHANGE_RATE_API }/latest`, { ...params }).then(res => res.json()),
        params
      };
    },
    list_currencies: async(_, params) => fetch.build(`${ process.env.EXCHANGE_RATE_API }/latest`, params).then(res => res.json())
  },
  Currencies: {
    currencies: (data) => Object.keys(get(data, 'rates', {}))
  },
  HistoricalRates: {
    base: ({ data }) => get(data, 'base', null),
    rates: ({ data, params }) => {
      const rates = get(data, 'rates', {});
      const foreign = get(params, 'foreign', null);

      // Tranforms the rates into the correct format
      return Object.keys(rates).map(date => {
        return {
          date,
          rate: get(rates, `${ date }.${ foreign }`, null)
        }
      });
    }
  },
  Rates: {
    base: ({ data }) => get(data, 'base', null),
    date: ({ data }) => get(data, 'date', null),
    rates: ({ data, params }) => {
      const rates = get(data, 'rates', {});
      const amount = get(params, 'amount', false);

      // Tranforms the rates into the correct format
      return Object.keys(rates).map(currency => {
        return {
          currency,
          rate: amount ? parseFloat(rates[currency]) * parseFloat(amount) : rates[currency]
        };
      })
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
