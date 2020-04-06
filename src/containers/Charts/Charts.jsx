import React, { useState, useEffect, Fragment } from 'react';

import Button from '../../components/Button/Button';

import './Charts.css';
import LineChart from '../../components/LineChart/LineChart';
import { getTrades } from '../../utils/get-trades';
import PairOutcomesChart from '../../components/PairOutcomesChart/PairOutcomesChart';
import OutcomesByDirection from '../../components/OutcomesByDirection/OutcomesByDirection';

const Charts = ({ token, user, updateCharts }) => {
  // Set trades and update
  const [trades, setTrades] = useState([]);

  // Shows/Hides stat list
  const [showStats, setShowStats] = useState(false);

  // Set chart to display
  const [chart, setChart] = useState(null);

  const listToggler = (event) => {
    event.preventDefault();
    setShowStats(!showStats);
  };
  const chartSelector = (event) => {
    const chart = event.currentTarget.innerText;
    console.log('in selector');

    switch (chart) {
      case 'Equity Chart':
        return setChart(<LineChart trades={trades} user={user} />);
      case 'By Pair':
        return setChart(<PairOutcomesChart trades={trades} />);
      case 'By Direction':
        return setChart(<OutcomesByDirection trades={trades} />);
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchTrades = async () => {
      const { trades } = await getTrades(token);

      trades.sort((a, b) => new Date(a.dateOpened) - new Date(b.dateOpened));

      setTrades(trades);
      setChart(<LineChart trades={trades} user={user} />);
    };
    fetchTrades();
  }, [token, user, updateCharts]);

  let list;

  if (showStats) {
    list = (
      <Fragment>
        <div className="chart-container-nav">
          <span
            onClick={(event) => {
              chartSelector(event);
            }}
          >
            <Button styling="chart-nav">Equity Chart</Button>
          </span>
          <span
            onClick={(event) => {
              chartSelector(event);
            }}
          >
            <Button styling="chart-nav">By Pair</Button>
          </span>
          <span
            onClick={(event) => {
              chartSelector(event);
            }}
          >
            <Button styling="chart-nav">By Direction</Button>
          </span>
        </div>
        <div className="chart-container ">
          <div>
            {trades.length === 0 ? (
              <p className="span-trade-prompt mt-2">
                No trades in Trade History yet
              </p>
            ) : (
              chart
            )}
          </div>
        </div>
      </Fragment>
    );
  } else {
    list = null;
  }

  return (
    <div className="Charts">
      <div className="statistics-head">
        <h2>
          Trade <span className="span-green">$</span>tats
        </h2>
        <Button toggle={listToggler} styling="hide-list">
          {showStats ? 'Hide' : 'Show'} Stats List
        </Button>
      </div>
      {list}
    </div>
  );
};

export default Charts;
