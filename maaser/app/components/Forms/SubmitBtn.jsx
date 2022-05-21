import React from 'react';
import { OutlinedSpinner } from '../Spinner';

const SubmitBtn = ({ value, loading, onClick }) => {
  return (
    <button
      className="btn btnPrimary"
      type="submit"
      onClick={onClick}
      disabled={loading ? true : false}
    >
      {value}
      {loading ? <OutlinedSpinner /> : null}
    </button>
  );
};

export default SubmitBtn;
