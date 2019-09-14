import gql from 'graphql-tag';

export const LIST_CURRENCIES = gql`
  query {
    list_currencies {
      currencies
    }
  }
`;