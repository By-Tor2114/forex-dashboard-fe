import React from 'react';

const Button = ({ children, styling, toggle }) => {
  return (
    <div className="Button">
      <button onClick={toggle} className={styling}>
        {children}
      </button>
    </div>
  );
};

export default Button;
