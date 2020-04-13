import React, { useEffect, useState } from 'react';

import './Pending.css';
import Button from '../../components/Button/Button';
import { getPending } from '../../utils/get-pending';
import { dateFormatter } from '../../utils/helper-funcs';

const Pending = ({ token }) => {
  const [pendingTrades, setPendingTrades] = useState([]);

  useEffect(() => {
    const fetchPendings = async () => {
      const { pendings } = await getPending(token);

      pendings.sort((a, b) => new Date(a.datePosted) - new Date(b.datePosted));

      setPendingTrades(pendings);
    };
    fetchPendings();
  }, [token]);

  return (
    <div className="Pending">
      <div className="pending-head">
        <h2>
          Pending Trade
          <span className="span-green">$</span>
        </h2>
        <Button styling={'button-add'}>Add Pending</Button>
      </div>
      <ul>
        {pendingTrades.map((trade, index) => (
          <li key={index} className="pending-list">
            <div>
              <p>{trade.currencyPair}</p>
              <p>{trade.tradeDirection}</p>
            </div>
            <div>
              <p>Posted: {dateFormatter(trade.datePosted)}</p>
            </div>
            <div>
              <p className="view-trade">View Trade</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pending;
