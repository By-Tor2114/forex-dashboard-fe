import React, { useEffect, useState } from 'react';

import './Pending.css';
import Button from '../../components/Button/Button';
import { getPending } from '../../utils/get-pending';

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
        <Button styling={'hide-list'}>Show Pending</Button>
      </div>
    </div>
  );
};

export default Pending;
