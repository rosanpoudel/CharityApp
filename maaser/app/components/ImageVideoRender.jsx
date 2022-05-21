import React from 'react';

const ImageVideoRender = ({ url }) => {
  return (
    <div>
      <>
        {url.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
          <div className="thumbnail-image">
            <img src={url} alt="" style={{ width: '100%' }} />
          </div>
        ) : (
          <div className="thumbnail-video">
            <video style={{ width: '100%' }} controls id="video-tag">
              <source id="video-source" src={url} />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </>
    </div>
  );
};

export default ImageVideoRender;
