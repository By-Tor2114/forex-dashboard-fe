import React, { useState, useContext } from 'react';
import axios from 'axios';

import FormInput from '../FormInput/FormInput';
import AppContext from '../../context/context';
import { addEditDeleteTrade } from '../../utils/add-edit-delete-trade';
import Button from '../Button/Button';
import './AddEditTradeModal.css';
import AddImage from '../AddImage/AddImage';

const AddEditTradeModal = ({
  toggle,
  updateTrades,
  setUpdateTrades,
  method,
  trade,
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
    _id,
  } = trade;

  const [postTrade, setPostTrade] = useState({});
  const [disableButton, setDisableButton] = useState(true);
  const [updateMessage, setUpdateMessage] = useState(false);
  console.log(postTrade);

  const onChangeHandler = (event) => {
    setPostTrade({
      ...postTrade,
      [event.target.id]: event.target.value,
    });

    formChecker({ ...postTrade, [event.target.id]: event.target.value });
  };

  const formChecker = (updates) => {
    const checked = Object.values(updates).find((elem) => elem.length > 0);

    setUpdateMessage(false);

    return checked === undefined
      ? setDisableButton(true)
      : setDisableButton(false);
  };

  const uploadImage = async (event) => {
    event.preventDefault();

    const files = event.target.files;

    let fileData = new FormData();

    fileData.append('file', files[0]);
    fileData.append('upload_preset', 'fx-dashboard');

    try {
      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/dbspfwtzp/image/upload',
        fileData
      );

      setPostTrade({
        ...postTrade,
        imageURL: data.secure_url,
      });

      formChecker({ ...postTrade, imageURL: data.secure_url });
    } catch (error) {
      console.dir(error, 'cloud error');
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(postTrade, 'in submit handler');

    const response = await addEditDeleteTrade(
      postTrade,
      context.token.user.token,
      method,
      _id
    );
    console.log(response, '<==== response');
    if (response) {
      setUpdateMessage(true);
      setUpdateTrades(!updateTrades);
      context.setUpdateCharts(!context.updateCharts);
    }
    setPostTrade({});
  };

  const deleteTradeHandler = async (event) => {
    event.preventDefault();
    const deleted = await addEditDeleteTrade(
      null,
      context.token.user.token,
      'DELETE',
      _id
    );
    console.log(deleted);

    if (deleted) {
      setUpdateTrades(!updateTrades);
      context.setUpdateCharts(!context.updateCharts);
    }
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
      <div onClick={toggle} className="modal-closer">
        <h2>X</h2>
      </div>
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
            tradeDirection !== undefined
              ? tradeDirection === 'Buy'
                ? [tradeDirection, 'Sell']
                : [tradeDirection, 'Buy']
              : ['', 'Buy', 'Sell']
          }
          required={!trade.outcome && true}
        />
        <FormInput
          changeHandler={onChangeHandler}
          id="swap"
          type="number"
          name="Swap (optional)"
          placeholder={swap || 'example: -22.50 || 22.50'}
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
        <AddImage
          changeHandler={uploadImage}
          id="image-file"
          type="file"
          value="Upload Image"
          styling="custom-input"
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
        {trade.outcome && (
          <Button toggle={deleteTradeHandler} styling="button-delete">
            Delete Trade
          </Button>
        )}
        <Button toggle={toggle} styling="button-cancel">
          Close Window
        </Button>
      </form>
    </div>
  );
};

export default AddEditTradeModal;
