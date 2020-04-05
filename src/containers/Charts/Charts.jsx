import React, { useState, useEffect } from 'react';

import Button from '../../components/Button/Button';

import './Charts.css';
import LineChart from '../../components/LineChart/LineChart';
import { getTrades } from '../../utils/get-trades';
const Charts = ({ token, user }) => {
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
        return setChart(<LineChart trades={trades} />);
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchTrades = async () => {
      const { trades } = await getTrades(token);

      trades.sort((a, b) => new Date(a.dateOpened) - new Date(b.dateOpened));

      setTrades(trades);
    };
    fetchTrades();
  }, [token]);

  let list;

  if (showStats) {
    list = (
      <div className="chart-container">
        <span
          onClick={(event) => {
            chartSelector(event);
          }}
        >
          <Button styling="chart-nav">Equity Chart</Button>
        </span>
        {chart}
      </div>
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
        <Button toggle={listToggler} styling="hide-list">
          {showStats ? 'Hide' : 'Show'} Stats List
        </Button>
      </div>
      {list}
    </div>
  );
};

export default Charts;
