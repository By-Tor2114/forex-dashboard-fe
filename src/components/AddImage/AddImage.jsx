import React from 'react';

import './AddImage.css';

const AddImage = ({ changeHandler, type, id, name, value, styling }) => {
  return (
    <div className="AddImage">
      <label onChange={changeHandler} htmlFor={name}>
        {value}
        <input className={styling} type={type} id={id} name={name} />
        <span>Upload Image</span>
      </label>
    </div>
  );
};

export default AddImage;
