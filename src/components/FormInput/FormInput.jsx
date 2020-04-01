import React from 'react';

import './FormInput.css';

const FormInput = ({
  id,
  type,
  name,
  changeHandler,
  placeholder,
  required
}) => {
  return (
    <div className="FormInput">
      <label htmlFor={name}>{name}</label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        onChange={changeHandler}
      />
    </div>
  );
};

export default FormInput;
