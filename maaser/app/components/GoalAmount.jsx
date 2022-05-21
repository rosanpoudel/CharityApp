import React from 'react';
import dollarIcon from '../images/dollar-icon.svg';

const GoalAmount = ({ value, setAmount }) => {
  return (
    <div className="goal-amount">
      <span>
        <img src={dollarIcon} alt="" />
      </span>
      <input
        value={value > 0 ? value / 100 : ''}
        onChange={e => {
          setAmount(e.target.value * 100);
        }}
        className="goal-amount-input"
        type="text"
        required
      />
    </div>
  );
};

export default GoalAmount;
