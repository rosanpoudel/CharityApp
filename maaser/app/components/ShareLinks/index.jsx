import React from 'react';
import { shareLinksData } from './data';

const ShareLinks = () => {
  return (
    <div className="links-group">
      {shareLinksData.map((link, index) => {
        return (
          <div className="share-link" key={index} onClick={link.onClick}>
            <div className="image">
              <img src={link.img} alt="" />
            </div>
            <p className="c-text">{link.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ShareLinks;
