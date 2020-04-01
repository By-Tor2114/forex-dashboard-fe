import React from 'react';

const Button = ({ children, styling }) => {
  return (
    <div className="Button">
      <button className={styling}>{children}</button>
    </div>
  );
};

export default Button;
