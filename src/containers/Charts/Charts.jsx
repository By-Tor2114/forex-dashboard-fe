import React, { useEffect, useState } from 'react';

import './Charts.css';
import { getTrades } from '../../utils/get-trades';
import Button from '../../components/Button/Button';

const Charts = ({ token, user }) => {
  // Initial Trades
  const [trades, setTrades] = useState([]);

  const [showStats, setShowStats] = useState(true);

  useEffect(() => {
    const fetchTrades = async () => {
      const { trades } = await getTrades(token);

      trades.sort((a, b) => new Date(a.dateOpened) - new Date(b.dateOpened));

      setTrades(trades);
    };

    fetchTrades();
  }, [token, user.accountBalance]);

  return (
    <div className="Charts">
      <div className="statistics-head">
        <h2 className="m-1">
          Trade <span className="span-green">$</span>tats
        </h2>
        <Button styling="hide-list mr-1">
          {showStats ? 'Hide' : 'Show'} Stats List
        </Button>
      </div>
    </div>
  );
};

export default Charts;
