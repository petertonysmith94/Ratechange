import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Query } from 'react-apollo';

// COMPONENTS & STYLES
import Input from '../Input';
import Dropdown from '../Dropdown';
import { ExchangeWrapper } from './exchange.styles';

// HELPERS
import { LIST_CURRENCIES } from '../../queries/exchange';

const Exchange = (props) => {
  const {
    amount,
    base,
    foreign,
    onChange
  } = props;

  const [loaded, setLoaded] = React.useState(false);

  return (
    <Query
      query={ LIST_CURRENCIES }
    >
      { ({
        data, loading, error
      }) => {
        if (loading) {
          return (
            <p>Loading...</p>
          );
        }

        if (error) {
          console.log(error);
          return (
            <p>Error.</p>
          );
        }

        const currencies = get(data, 'list_currencies.currencies', []);
        if (!loaded) {
          onChange({
            amount,
            base: get(currencies, '[0]', '').toLowerCase(),
            foreign: get(currencies, '[1]', '').toLowerCase()
          });
          setLoaded(true);
        }

        return (
          <ExchangeWrapper>
            { /* The amount to be converted */ }
            <Input
              name='amount'
              label='Amount'
              type='number'
              value={ amount }
              onChange={ ({ value }) => onChange({ amount: value, base, foreign }) }
            />

            { /* The base currency */ }
            <Dropdown
              name='base'
              label='From'
              value={ base }
              data={ currencies.filter(currency => currency.toLowerCase() !== foreign ) }
              onChange={ ({ value }) => onChange({ amount, base: value, foreign }) }
            />

            { /* The foreign currency */ }
            <Dropdown
              name='foreign'
              label='To'
              value={ foreign }
              data={ currencies.filter(currency => currency.toLowerCase() !== base ) }
              onChange={ ({ value }) => onChange({ amount, base, foreign: value }) }
            />
          </ExchangeWrapper>
        );
      } }
    </Query>
  );
};

Exchange.defaultProps = {
  amount: '1',
  base: '',
  foreign: ''
};

Exchange.propTypes = {
  amount: PropTypes.string,
  base: PropTypes.string,
  foreign: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default Exchange;