import React from 'react';
import PlusIcon from '../../images/plus-icon.svg';

const PopUpTrigger = ({ onClick }) => {
  return (
    <div className="popup-trigger" onClick={onClick}>
      <img src={PlusIcon} alt="plus icon" />
    </div>
  );
};

export default PopUpTrigger;
