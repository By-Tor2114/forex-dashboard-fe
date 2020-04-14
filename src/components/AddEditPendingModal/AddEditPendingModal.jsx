import React, { useState, useContext } from 'react';

import './AddEditPendingModal.css';
import FormInput from '../FormInput/FormInput';
import AddImage from '../AddImage/AddImage';
import Button from '../Button/Button';
import AppContext from '../../context/context';
import { addEditDeletePending } from '../../utils/add-edit-delete-pending';

const AddEditPendingModal = ({
  method,
  trade,
  updateTrades,
  setUpdateTrades,
  toggle,
}) => {
  const context = useContext(AppContext);

  const {
    _id,
    datePosted,
    currencyPair,
    tradeNotes,
    tradeDirection,
    imageURL,
  } = trade;

  const [postTrade, setPostTrade] = useState({});
  const [disableButton, setDisableButton] = useState(true);
  const [updateMessage, setUpdateMessage] = useState(false);

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

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const response = await addEditDeletePending(
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
        {trade.datePosted ? 'Update Trade' : 'Add Trade'}
      </Button>
    );
  }

  return (
    <div className="AddEditPendingModal">
      <div onClick={toggle} className="modal-closer">
        <h2>X</h2>
      </div>
      <form onSubmit={onSubmitHandler}>
        {method === 'PATCH' ? (
          <h2 className="trade-modal-header">View/Edit Trade</h2>
        ) : (
          <h2 className="trade-modal-header">Add Pending Trade</h2>
        )}

        <FormInput
          changeHandler={onChangeHandler}
          id="currencyPair"
          type="text"
          name="Currency Pair (required)"
          placeholder={currencyPair || 'example: EUR/USD'}
          required={!trade.currencyPair && true}
        />

        <FormInput
          changeHandler={onChangeHandler}
          id="datePosted"
          type="date"
          name={'Date Posted (required)'}
          value={datePosted && datePosted.slice(0, 10)}
          required
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
        />

        <AddImage
          id="image-file"
          type="file"
          value={imageURL ? 'Change Image' : 'Upload Image'}
          styling="custom-input"
          imageURL={imageURL}
        />

        {imageURL && (
          <a href={imageURL} target="_blank" rel="noopener noreferrer">
            <img src={imageURL} alt="" />
          </a>
        )}

        {imageURL && (
          <p className="span-highlight mini-message">
            Click image to open full-size in a new tab
          </p>
        )}

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

export default AddEditPendingModal;
