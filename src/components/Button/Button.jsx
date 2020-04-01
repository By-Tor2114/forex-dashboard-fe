import React from 'react';

const Button = ({ children, styling, toggle, disableBool }) => {
  console.log(disableBool, '<=== in button');

  return (
    <div className="Button">
      <button
        disabled={false || disableBool}
        onClick={toggle}
        className={styling}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
