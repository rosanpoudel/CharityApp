import React from 'react';

const SmallCard = ({ img, title, text }) => {
  return (
    <div className="small-card">
      <img src={img} alt="" />
      <div>
        <h4 className="c-text">{title}</h4>
        <p className="c-text">{text}</p>
      </div>
    </div>
  );
};

export default SmallCard;
