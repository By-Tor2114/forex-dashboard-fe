import React from 'react';
import './Modal.css';
import FormInput from '../FormInput/FormInput';

const Modal = () => {
  return (
    <div className="Modal">
      <form>
        <FormInput name={'First Name'} placeholder={'Ben'} />
        <FormInput name={'Last Name'} />
        <FormInput name={'E-mail'} />
        <FormInput name={'Account Balance'} />
      </form>
    </div>
  );
};

export default Modal;
