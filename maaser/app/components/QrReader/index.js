import React from 'react';
// qr reader
import QrReader from 'react-qr-reader';

const QrCodeReader = ({ getScanValue, getError }) => {
  return (
    <div className="qr-scanner">
      <div className="inner">
        <QrReader
          className="qr-reader-webcam"
          delay={300}
          onScan={data => {
            getScanValue(data);
          }}
          onError={error => getError(error)}
          style={{ width: '500px' }}
        />
      </div>
    </div>
  );
};

export default QrCodeReader;
