import React from 'react';

import './AddEditPendingModal.css';
import FormInput from '../FormInput/FormInput';
import AddImage from '../AddImage/AddImage';
import Button from '../Button/Button';

const AddEditPendingModal = ({
  method,
  trade,
  updateTrades,
  setUpdateTrades,
  toggle,
}) => {
  const {
    _id,
    createdBy,
    datePosted,
    currencyPair,
    tradeNotes,
    tradeDirection,
    imageURL,
  } = trade;
  return (
    <div className="AddEditPendingModal">
      <div onClick={toggle} className="modal-closer">
        <h2>X</h2>
      </div>
      <form>
        {method === 'PATCH' ? (
          <h2 className="trade-modal-header">View/Edit Trade</h2>
        ) : (
          <h2 className="trade-modal-header">Add Trade</h2>
        )}

        <FormInput
          id="currencyPair"
          type="text"
          name="Currency Pair (required)"
          placeholder={currencyPair || 'example: EUR/USD'}
          required
        />

        <FormInput
          id="datePosted"
          type="date"
          name={'Date Posted (required)'}
          value={datePosted && datePosted.slice(0, 10)}
          required
        />

        <FormInput
          id="tradeDirection"
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
          <div className="image-div">
            <a href={imageURL} target="_blank" rel="noopener noreferrer">
              <img src={imageURL} alt="" />
            </a>
            <p className="span-highlight mini-message">
              Click image to open full-size in a new tab
            </p>
          </div>
        )}

        <FormInput
          id="tradeNotes"
          type="textarea"
          name="Trade Notes (optional)"
          placeholder={
            tradeNotes || 'example: Fib retracement trade off daily support'
          }
          required={false}
        />
        <Button toggle={toggle} styling="button-cancel">
          Close Window
        </Button>
      </form>
    </div>
  );
};

export default AddEditPendingModal;
