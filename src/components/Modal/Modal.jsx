import React, { useContext, useState } from 'react';

import FormInput from '../FormInput/FormInput';
import AppContext from '../../context/context';
import Button from '../Button/Button';

import { updateUser } from '../../utils/update-user';
import './Modal.css';

const Modal = ({ toggle }) => {
  const context = useContext(AppContext);

  const { firstName, lastName, accountBalance, email } = context.token.user;
  const { initialiseAccount } = context;

  const [profileUpdate, setProfileUpdate] = useState({ update: {} });
  const [disableButton, setDisableButton] = useState(true);
  const [updateMessage, setUpdateMessage] = useState(false);

  const formChecker = (updates) => {
    const checked = Object.values(updates).find((elem) => elem.length > 0);

    setUpdateMessage(false);

    return checked === undefined
      ? setDisableButton(true)
      : setDisableButton(false);
  };

  const onChangeHandler = (event) => {
    setProfileUpdate({
      update: {
        ...profileUpdate.update,
        [event.target.id]: event.target.value,
      },
    });

    formChecker({
      ...profileUpdate.update,
      [event.target.id]: event.target.value,
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const response = await updateUser(profileUpdate, context.token.user);

    initialiseAccount(response);

    if (response) {
      setUpdateMessage(true);
    }
  };

  let saveChanges;

  if (updateMessage) {
    saveChanges = (
      <p className="span-green font-size-2">Updates saved sucessfully</p>
    );
  } else {
    saveChanges = (
      <Button
        disableBool={disableButton ? true : false}
        styling={disableButton ? 'button-greyed-out' : 'button-success'}
      >
        Save Changes
      </Button>
    );
  }

  return (
    <div className="Modal">
      <form onSubmit={onSubmitHandler}>
        <FormInput
          id="firstName"
          changeHandler={onChangeHandler}
          name={'First Name'}
          type="text"
          placeholder={firstName}
        />
        <FormInput
          id="lastName"
          changeHandler={onChangeHandler}
          name={'Last Name'}
          type="text"
          placeholder={lastName}
        />
        <FormInput
          id="email"
          changeHandler={onChangeHandler}
          name={'E-mail'}
          type="email"
          placeholder={email}
        />
        <FormInput
          id="accountBalance"
          changeHandler={onChangeHandler}
          name={'Account Balance'}
          type="number"
          placeholder={accountBalance}
          step={'0.01'}
        />
        {saveChanges}
        <Button toggle={toggle} styling="button-cancel">
          Close Profile
        </Button>
      </form>
    </div>
  );
};

export default Modal;
