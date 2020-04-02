import React, { useState, useEffect } from 'react';

import Button from '../../components/Button/Button';
import './TradeHistory.css';

const { getTrades } = require('../../utils/get-trades');

const TradeHistory = ({ token }) => {
  const [trades, setTrades] = useState([1, 2]);

  useEffect(() => {
    const fetchTrades = async () => {
      const { trades } = await getTrades(token);

      setTrades(trades);
    };
    fetchTrades();
  }, []);

  return (
    <div className="TradeHistory">
      <div className="history-head">
        <h2 className="m-1">Trade History</h2>
        <Button styling="button-add m-1">Add Trade</Button>
      </div>
      <ul>
        {trades.map((trade, index) => (
          <li key={index} className={trade.outcome}>
            <div className="m-05">
              <p>{trade.currencyPair}</p>
              <p>{trade.outcome} </p>
            </div>

            <div className="m-05">
              <p> Opened: {trade.dateOpened} </p>
              <p> Closed: {trade.dateClosed} </p>
            </div>

            <div className="m-05">
              <p>
                {trade.outcome === 'winner' ? 'Profit' : 'Loss'}:{' '}
                {trade.profitLoss || 'N/A'}
              </p>
              <p>View Trade</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TradeHistory;
