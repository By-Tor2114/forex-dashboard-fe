import React, { useState, useContext } from 'react';

import FormInput from '../FormInput/FormInput';
import AppContext from '../../context/context';
import { addTrade } from '../../utils/add-trade';
import './AddTradeModal.css';
import Button from '../Button/Button';

const AddTradeModal = ({ toggle }) => {
  const context = useContext(AppContext);

  const [postTrade, setPostTrade] = useState({ update: {} });

  const onChangeHandler = event => {
    setPostTrade({
      update: { ...postTrade.update, [event.target.id]: event.target.value }
    });

    formChecker({ ...postTrade.update, [event.target.id]: event.target.value });
  };

  const formChecker = updates => {
    const checked = Object.values(updates).find(elem => elem.length > 0);

    // setUpdateMessage(false);

    // return checked === undefined
    //   ? setDisableButton(true)
    //   : setDisableButton(false);
  };

  const onSubmitHandler = async event => {
    event.preventDefault();

    const response = await addTrade(postTrade, context.token.user);

    // if (response) {
    //   setUpdateMessage(true);
    // }
  };

  return (
    <div className="AddTradeModal">
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
          name="Date Opened (required)"
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
        <Button toggle={toggle} styling="button-cancel">
          Close Window
        </Button>
      </form>
    </div>
  );
};

export default AddTradeModal;
