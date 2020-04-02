import React, { useState, useEffect } from 'react';

import './TradeHistory.css';

const { getTrades } = require('../../utils/get-trades');

const TradeHistory = ({ token }) => {
  const [trades, setTrades] = useState();

  useEffect(() => {
    const fetchTrades = async () => {
      const result = await getTrades(token);
      setTrades(result);
    };
    fetchTrades();
  }, [token]);

  return <div className="TradeHistory">Trade History</div>;
};

export default TradeHistory;
