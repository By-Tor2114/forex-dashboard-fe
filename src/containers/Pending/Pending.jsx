import React, { useEffect, useState } from 'react';

import './Pending.css';
import Button from '../../components/Button/Button';
import { getPending } from '../../utils/get-pending';
import { dateFormatter } from '../../utils/helper-funcs';
import AddEditPendingModal from '../../components/AddEditPendingModal/AddEditPendingModal';

const Pending = ({ token }) => {
  // Inital array of pending trades
  const [pendingTrades, setPendingTrades] = useState([]);

  // Sets whether posting or patching a trade
  const [method, setMethod] = useState('');

  // Show view/edit trade modal and sets individual trade for modal
  const [showViewPendingModal, setShowViewPendingModal] = useState(false);
  const [singleTrade, setSingleTrade] = useState({});

  // Show trade list, add trade modal and refreshes trade list
  const [showTrades, setShowTrades] = useState(false);
  const [showAddPendingModal, setShowAddPendingModal] = useState(false);
  const [updateTrades, setUpdateTrades] = useState(false);

  const addPendingModal = (event) => {};

  const viewPendingModal = (event, trade) => {
    event.preventDefault();
    setMethod('PATCH');
    setShowAddPendingModal(false);
    setSingleTrade(trade);
    setShowViewPendingModal(!showViewPendingModal);
  };

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
              <p
                onClick={(event) => viewPendingModal(event, trade)}
                className="view-trade"
              >
                View Trade
              </p>
            </div>
          </li>
        ))}
      </ul>
      {showViewPendingModal && <AddEditPendingModal />}
    </div>
  );
};

export default Pending;
