import React, { useState, useEffect, Fragment } from 'react';

import Button from '../../components/Button/Button';

import './Charts.css';
import LineChart from '../../components/LineChart/LineChart';
import { getTrades } from '../../utils/get-trades';
import PairOutcomesChart from '../../components/PairOutcomesChart/PairOutcomesChart';

const Charts = ({ token, user, updateCharts }) => {
  // CONTEXT

  // Set trades and update
  const [trades, setTrades] = useState([]);

  // Shows/Hides stat list
  const [showStats, setShowStats] = useState(true);

  // Set chart to display
  const [chart, setChart] = useState(null);

  const listToggler = (event) => {
    event.preventDefault();
    setShowStats(!showStats);
  };

  const chartSelector = (event) => {
    const chart = event.currentTarget.innerText;

    switch (chart) {
      case 'Equity Chart':
        return setChart(<LineChart trades={trades} user={user} />);
      case 'Outcomes By Pair':
        return setChart(<PairOutcomesChart trades={trades} />);
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchTrades = async () => {
      const { trades } = await getTrades(token);

      trades.sort((a, b) => new Date(a.dateOpened) - new Date(b.dateOpened));

      setTrades(trades);
      setChart(<PairOutcomesChart trades={trades} />);
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
            <Button styling="chart-nav mr-1 ">Equity Chart</Button>
          </span>
          <span
            onClick={(event) => {
              chartSelector(event);
            }}
          >
            <Button styling="chart-nav mr-1 ">Outcomes By Pair</Button>
          </span>
        </div>
        <div className="chart-container ">
          <div>{chart}</div>
        </div>
      </Fragment>
    );
  } else {
    list = null;
  }

  return (
    <div className="Charts">
      <div className="statistics-head">
        <h2 className="m-1">
          Trade <span className="span-green">$</span>tats
        </h2>
        <Button toggle={listToggler} styling="hide-list mr-1">
          {showStats ? 'Hide' : 'Show'} Stats List
        </Button>
      </div>
      {list}
    </div>
  );
};

export default Charts;
