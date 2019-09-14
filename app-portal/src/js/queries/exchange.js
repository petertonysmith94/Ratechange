import gql from 'graphql-tag';

export const LIST_CURRENCIES = gql`
  query {
    list_currencies {
      currencies
    }
  }
`;

export const LATEST_RATES = gql`
  query rates_latest($amount: Float, $base: String, $symbols: String) {
    rates_latest(amount: $amount, base: $base, symbols: $symbols) {
      base
      rates {
        currency
        rate
      }
    }
  }
`;