import React from 'react';

const ConfirmationModalRow = ({ label, data }) => {
  return (
    <div className="data-row">
      <p className="field">{label}</p>
      <p className="value">{data}</p>
    </div>
  );
};

export default ConfirmationModalRow;
