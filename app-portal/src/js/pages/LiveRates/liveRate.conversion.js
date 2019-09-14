import React from 'react';
import PropTypes from 'prop-types';
import { get, find } from 'lodash';

// COMPONENTS & STYLES
import { Query } from 'react-apollo';
import { ConversionWrapper, BaseRate, ForeignRate } from './liveRate.styles';

// HELPERS
import { LATEST_RATES } from '../../queries/exchange';

const Conversion = (props) => {
  const {
    amount,
    base,
    foreign
  } = props;

  return (
    <Query
      query={ LATEST_RATES }
      variables={ {
        amount: parseFloat(amount),
        base: base.toUpperCase(),
        symbols: `${ base.toUpperCase() },${ foreign.toUpperCase() }`
      } }
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

        const rates = get(data, 'rates_latest.rates', []);
        const baseRate = find(rates, {
          currency: base.toUpperCase()
        });
        const foreignRate = find(rates, {
          currency: foreign.toUpperCase()
        });

        return (
          <ConversionWrapper>
            <BaseRate>
              { get(baseRate, 'rate', '') } { get(baseRate, 'currency', '') } =
            </BaseRate>
            <ForeignRate>
              { get(foreignRate, 'rate', '') } { get(foreignRate, 'currency', '') }
            </ForeignRate>
          </ConversionWrapper>
        );
      } }
    </Query>
  );
};

Conversion.defaultProps = {};

Conversion.propTypes = {};

export default Conversion;