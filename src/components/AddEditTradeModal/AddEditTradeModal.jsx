import React, { useState, useContext } from 'react';

import FormInput from '../FormInput/FormInput';
import AppContext from '../../context/context';
import { addEditTrade } from '../../utils/add-edit-trade';
import './AddEditTradeModal.css';
import Button from '../Button/Button';

const AddEditTradeModal = ({
  toggle,
  updateTrades,
  setUpdateTrades,
  method,
  trade
}) => {
  const context = useContext(AppContext);

  const [postTrade, setPostTrade] = useState({});
  const [disableButton, setDisableButton] = useState(true);
  const [updateMessage, setUpdateMessage] = useState(false);

  console.log(method, trade);

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
      method
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
      <p className="span-green font-size-2">Trade added sucessfully</p>
    );
  } else {
    saveChanges = (
      <Button
        disableBool={disableButton ? true : false}
        styling={disableButton ? 'button-greyed-out' : 'button-success'}
      >
        Add Trade
      </Button>
    );
  }

  return (
    <div className="AddEditTradeModal">
      <form onSubmit={onSubmitHandler}>
        <FormInput
          changeHandler={onChangeHandler}
          id="currencyPair"
          type="text"
          name="Currency Pair (required)"
          placeholder="example: EUR/USD"
          required={true}
        />
        <FormInput
          changeHandler={onChangeHandler}
          id="outcome"
          type="select"
          name="Outcome (required)"
          options={['', 'Winner', 'Loser']}
          required={true}
        />
        <FormInput
          changeHandler={onChangeHandler}
          id="profitLoss"
          type="number"
          name="Profit/Loss (required)"
          placeholder="{exclude swap/commission}"
          required={true}
        />
        <FormInput
          changeHandler={onChangeHandler}
          id="tradeDirection"
          type="select"
          name="Trade Direction (required)"
          options={['', 'Buy', 'Sell']}
          required={true}
        />
        <FormInput
          changeHandler={onChangeHandler}
          id="swap"
          type="number"
          name="Swap (optional)"
          placeholder="example: 22.50"
          required={false}
        />
        <FormInput
          changeHandler={onChangeHandler}
          id="commission"
          type="number"
          name="Commission (optional)"
          placeholder="example: 15.73"
          required={false}
        />{' '}
        <FormInput
          changeHandler={onChangeHandler}
          id="tradeId"
          type="text"
          name="Trade Ref (optional)"
          placeholder="example: r3fer3nce"
        />
        <FormInput
          changeHandler={onChangeHandler}
          id="dateOpened"
          type="date"
          name="Date Opened (required)"
          required={true}
        />
        <FormInput
          changeHandler={onChangeHandler}
          id="dateClosed"
          type="date"
          name="Date Closed (required)"
          required={true}
        />
        <FormInput
          changeHandler={onChangeHandler}
          id="tradeNotes"
          type="textarea"
          name="Trade Notes (optional)"
          placeholder="Fib retracement trade off daily support"
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
