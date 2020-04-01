import React, { useContext } from 'react';
import './Modal.css';
import FormInput from '../FormInput/FormInput';
import AppContext from '../../context/context';
import Button from '../Button/Button';

const Modal = ({ toggle }) => {
  const context = useContext(AppContext);
  const { firstName, lastName, accountBalance, email } = context.token;

  return (
    <div className="Modal">
      <form>
        <FormInput name={'First Name'} placeholder={firstName} />
        <FormInput name={'Last Name'} placeholder={lastName} />
        <FormInput name={'E-mail'} placeholder={email} />
        <FormInput name={'Account Balance'} placeholder={accountBalance} />
        <Button styling={'button-success'}> Save Changes </Button>
        <Button toggle={toggle} styling={'button-cancel'}>
          {' '}
          Close Profile{' '}
        </Button>
      </form>
    </div>
  );
};

export default Modal;
