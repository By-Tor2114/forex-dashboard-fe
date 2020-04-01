import React, { useContext, useState } from 'react';

import FormInput from '../FormInput/FormInput';
import AppContext from '../../context/context';
import Button from '../Button/Button';

import { updateUser } from '../../utils/update-user';
import './Modal.css';

const Modal = ({ toggle }) => {
  const context = useContext(AppContext);
  const { firstName, lastName, accountBalance, email } = context.token;

  const [profileUpdate, setProfileUpdate] = useState({ update: {} });

  const onChangeHandler = event => {
    setProfileUpdate({
      update: { ...profileUpdate.update, [event.target.id]: event.target.value }
    });
  };

  const onSubmitHandler = async event => {
    event.preventDefault();

    const response = await updateUser(profileUpdate);
  };

  return (
    <div className="Modal">
      <form onSubmit={onSubmitHandler}>
        <FormInput
          id="firstName"
          changeHandler={onChangeHandler}
          name={'First Name'}
          placeholder={firstName}
        />
        <FormInput
          id="lastName"
          changeHandler={onChangeHandler}
          name={'Last Name'}
          placeholder={lastName}
        />
        <FormInput
          id="email"
          changeHandler={onChangeHandler}
          name={'E-mail'}
          placeholder={email}
        />
        <FormInput
          id="accountBalance"
          changeHandler={onChangeHandler}
          name={'Account Balance'}
          placeholder={accountBalance}
        />
        <Button
          disableBool={
            Object.keys(profileUpdate.update).length === 0 ? true : false
          }
          styling={
            Object.keys(profileUpdate.update).length === 0
              ? 'button-greyed-out'
              : 'button-success'
          }
        >
          Save Changes
        </Button>
        <Button toggle={toggle} styling={'button-cancel'}>
          Close Profile
        </Button>
      </form>
    </div>
  );
};

export default Modal;
