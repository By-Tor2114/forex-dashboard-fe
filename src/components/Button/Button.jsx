import React from 'react';

const Button = ({ children, style }) => {
  return (
    <div className="Button">
      <button className={style}>{children}</button>
    </div>
  );
};

export default Button;
