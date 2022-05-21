import React from 'react';

export const CaptionedTitle = ({ title, caption }) => {
  return (
    <div className="captioned-title">
      <h2 className="title">{title}</h2>
      <p className="caption">{caption}</p>
    </div>
  );
};
