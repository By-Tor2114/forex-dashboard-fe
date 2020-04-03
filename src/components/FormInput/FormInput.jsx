import React, { Fragment } from 'react';

import './FormInput.css';

const FormInput = ({
  id,
  type,
  name,
  changeHandler,
  placeholder,
  required,
  options,
  textarea
}) => {
  let inputType;

  if (options) {
    inputType = (
      <Fragment>
        <label htmlFor={name}>{name}</label>
        <select
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          onChange={changeHandler}
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Fragment>
    );
  } else if (type === 'textarea') {
    inputType = (
      <Fragment>
        <label htmlFor={name}>{name}</label>
        <textarea
          rows="4"
          cols="20"
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          onChange={changeHandler}
        ></textarea>
      </Fragment>
    );
  } else {
    inputType = (
      <Fragment>
        <label htmlFor={name}>{name}</label>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          onChange={changeHandler}
        />
      </Fragment>
    );
  }
  return <div className="FormInput">{inputType}</div>;
};

export default FormInput;
