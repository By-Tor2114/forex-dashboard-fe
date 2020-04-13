import React from 'react';

import './Spinner.css';

const Spinner = () => {
  return (
    <div>
      <p>
        This may take several seconds while the app is still hosted on free
        services...
      </p>
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;
