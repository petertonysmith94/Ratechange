import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { format } from 'date-fns'

// COMPONENTS & STYLES
import { Query } from 'react-apollo';
import { Line } from 'react-chartjs-2';

// HELPERS
import { HISTORICAL_RATES } from '../../queries/exchange'

const HistoricalChart = (props) => {
  const {
    base,
    foreign,
    from,
    to
  } = props;

  const convertData = (data) => {
    const labels = [];
    const rates = [];

    get(data, 'rates_historical.rates', []).forEach( (value) => {
      labels.push(value.date);
      rates.push(value.rate);
    });

    return {
      labels,
      datasets: [
        {
          label: get(data, 'rates_historical.base'),
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: rates
        }
      ]
    }
  };
  
  const data = {
    labels: ['2018-08-01', '2018-08-02'],
    datasets: [
      {
        label: 'CAD',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [0.5845972031, 0.5886489699]
      }
    ]
  };

  return (
    <Query
      query={ HISTORICAL_RATES }
      variables={ {
        base: base.toUpperCase(),
        foreign: foreign.toUpperCase(),
        from: format(from, 'yyyy-MM-dd'),
        to: format(to, 'yyyy-MM-dd')
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
        
        return (
          <Line data={ convertData(data) } />
        );
      } }
    </Query>
  )
};

HistoricalChart.defaultProps = {};

HistoricalChart.propTypes = {
  base: PropTypes.string.isRequired,
  foreign: PropTypes.string.isRequired,
  from: PropTypes.instanceOf(Date).isRequired,
  to: PropTypes.instanceOf(Date).isRequired
};

export default HistoricalChart;