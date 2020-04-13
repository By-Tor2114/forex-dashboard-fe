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

  const addPendingModal = (event) => {
    console.log('here');

    event.preventDefault();
    setMethod('POST');
    setSingleTrade({});
    setShowTrades(true);
    setShowViewPendingModal(false);
    setShowAddPendingModal(!showAddPendingModal);
  };

  const viewPendingModal = (event, trade) => {
    event.preventDefault();
    setMethod('PATCH');
    setShowAddPendingModal(false);
    setSingleTrade(trade);
    setShowViewPendingModal(!showViewPendingModal);
  };

  const listToggler = (event) => {
    event.preventDefault();
    setShowViewPendingModal(false);
    setShowTrades(!showTrades);
  };

  useEffect(() => {
    const fetchPendings = async () => {
      const { pendings } = await getPending(token);

      pendings.sort((a, b) => new Date(a.datePosted) - new Date(b.datePosted));

      setPendingTrades(pendings);
    };
    fetchPendings();
  }, [token]);

  let list;

  if (showTrades) {
    list = (
      <ul>
        {pendingTrades.map((trade, index) => (
          <li key={index} className="pending-list">
            <div className="pending-boxes">
              <p>{trade.currencyPair}</p>
              <p>{trade.tradeDirection}</p>
            </div>
            <div className="pending-boxes">
              <p>Posted: {dateFormatter(trade.datePosted)}</p>
            </div>
            <div className="pending-boxes">
              <p
                onClick={(event) => viewPendingModal(event, trade)}
                className="view-trade"
              >
                View Trade
              </p>
            </div>
          </li>
        ))}

        {showAddPendingModal && (
          <AddEditPendingModal
            updateTrades={updateTrades}
            setUpdateTrades={setUpdateTrades}
            toggle={addPendingModal}
            trade={singleTrade}
            method={method}
          />
        )}
      </ul>
    );
  } else {
    list = null;
  }

  return (
    <div className="Pending">
      <div className="pending-head">
        <h2>
          Pending Trade
          <span className="span-green">$</span>
        </h2>
        <Button toggle={addPendingModal} styling={'button-add'}>
          Add Pending
        </Button>
      </div>
      <div className="list-head">
        <Button toggle={listToggler} styling="hide-list">
          {showTrades ? 'Hide' : 'Show'} Trade List
        </Button>
      </div>
      {list}
      {showViewPendingModal && (
        <AddEditPendingModal
          method={method}
          trade={singleTrade}
          updateTrades={updateTrades}
          setUpdateTrades={setUpdateTrades}
          toggle={viewPendingModal}
        />
      )}
    </div>
  );
};

export default Pending;
