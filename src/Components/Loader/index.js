import React from 'react';

import './index.css';

function Loader() {
  return (
    <div className="loader-container">
      <div className="shapes-container">
        <div className="circle left-circle"></div>
        <div className="circle middle-circle"></div>
        <div className="circle right-circle"></div>
      </div>
    </div>
  );
}

export default Loader;
