import React, { useState, useContext } from 'react';

import FormInput from '../FormInput/FormInput';
import AppContext from '../../context/context';
import { addEditTrade } from '../../utils/add-edit-trade';
import Button from '../Button/Button';
import './AddEditTradeModal.css';

const AddEditTradeModal = ({
  toggle,
  updateTrades,
  setUpdateTrades,
  method,
  trade
}) => {
  const context = useContext(AppContext);
  const {
    currencyPair,
    outcome,
    profitLoss,
    swap,
    commission,
    dateOpened,
    dateClosed,
    tradeId,
    tradeNotes,
    tradeDirection,
    _id
  } = trade;

  const [postTrade, setPostTrade] = useState({});
  const [disableButton, setDisableButton] = useState(true);
  const [updateMessage, setUpdateMessage] = useState(false);

  const onChangeHandler = event => {
    setPostTrade({
      ...postTrade,
      [event.target.id]: event.target.value
    });

    formChecker({ ...postTrade, [event.target.id]: event.target.value });
  };

  const formChecker = updates => {
    const checked = Object.values(updates).find(elem => elem.length > 0);

    setUpdateMessage(false);

    return checked === undefined
      ? setDisableButton(true)
      : setDisableButton(false);
  };

  const onSubmitHandler = async event => {
    event.preventDefault();

    const response = await addEditTrade(
      postTrade,
      context.token.user.token,
      method,
      _id
    );

    console.log(response, '<==== response');

    if (response) {
      setUpdateMessage(true);
      setUpdateTrades(!updateTrades);
    }

    setPostTrade({});
  };

  let saveChanges;

  if (updateMessage) {
    saveChanges = (
      <p className="span-green font-size-2">
        {trade.outcome
          ? 'Trade updated successfully'
          : 'Trade added sucessfully'}
      </p>
    );
  } else {
    saveChanges = (
      <Button
        disableBool={disableButton ? true : false}
        styling={disableButton ? 'button-greyed-out' : 'button-success'}
      >
        {trade.outcome ? 'Update Trade' : 'Add Trade'}
      </Button>
    );
  }

  return (
    <div className="AddEditTradeModal">
      <form onSubmit={onSubmitHandler}>
        {outcome ? (
          <h2 className="trade-modal-header">View/Edit Trade</h2>
        ) : (
          <h2 className="trade-modal-header">Add Trade</h2>
        )}
        <FormInput
          changeHandler={onChangeHandler}
          id="currencyPair"
          type="text"
          name="Currency Pair (required)"
          placeholder={currencyPair || 'example: EUR/USD'}
          required={!trade.outcome && true}
        />
        <FormInput
          changeHandler={onChangeHandler}
          id="outcome"
          type="select"
          name={'Outcome (required)'}
          options={
            outcome !== undefined
              ? outcome === 'Winner'
                ? [outcome, 'Loser']
                : [outcome, 'Winner']
              : ['', 'Winner', 'Loser']
          }
          required={!trade.outcome && true}
        />
        <FormInput
          changeHandler={onChangeHandler}
          id="profitLoss"
          type="number"
          name="Profit/Loss (required)"
          placeholder={profitLoss || '{exclude swap/commission}'}
          required={!trade.outcome && true}
        />
        <FormInput
          changeHandler={onChangeHandler}
          id="tradeDirection"
          type="select"
          name="Trade Direction (required)"
          options={
            tradeDirection === 'Buy'
              ? [tradeDirection, 'Sell']
              : [tradeDirection, 'Buy'] || ['', 'Buy', 'Sell']
          }
          required={!trade.outcome && true}
        />
        <FormInput
          changeHandler={onChangeHandler}
          id="swap"
          type="number"
          name="Swap (optional)"
          placeholder={swap || 'example: 22.50'}
          required={false}
        />
        <FormInput
          changeHandler={onChangeHandler}
          id="commission"
          type="number"
          name="Commission (optional)"
          placeholder={commission || 'example: 15.73'}
          required={false}
        />{' '}
        <FormInput
          changeHandler={onChangeHandler}
          id="tradeId"
          type="text"
          name="Trade Ref (optional)"
          placeholder={tradeId || 'example: r3fer3nce'}
        />
        <FormInput
          changeHandler={onChangeHandler}
          id="dateOpened"
          type="date"
          name={'Date Opened (required)'}
          value={dateOpened && dateOpened.slice(0, 10)}
          required={!trade.outcome && true}
        />
        <FormInput
          changeHandler={onChangeHandler}
          id="dateClosed"
          type="date"
          name="Date Closed (required)"
          required={!trade.outcome && true}
          value={dateClosed && dateClosed.slice(0, 10)}
        />
        <FormInput
          changeHandler={onChangeHandler}
          id="tradeNotes"
          type="textarea"
          name="Trade Notes (optional)"
          placeholder={
            tradeNotes || 'example: Fib retracement trade off daily support'
          }
          required={false}
        />
        {saveChanges}
        <Button toggle={toggle} styling="button-cancel">
          Close Window
        </Button>
      </form>
    </div>
  );
};

export default AddEditTradeModal;
