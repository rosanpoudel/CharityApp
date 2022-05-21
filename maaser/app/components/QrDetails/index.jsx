import React, { useState } from 'react';
import { Modal } from 'antd';
import QRCode from 'react-qr-code';
import Logo from '../../components/Logo';
import QrFrame from '../../images/qr-frame.svg';
// share links
import ShareLinks from '../../components/ShareLinks';

const QrDetails = ({ value, name, email }) => {
  // share modal
  const [modalOpen, setModalOpen] = useState(false);

  // download qr code
  function downloadQrCode(e) {
    const canvas = document.createElement('canvas');
    const svg = document.querySelector('#qrCode');
    const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
    const w = parseInt(svg.getAttribute('width'));
    const h = parseInt(svg.getAttribute('height'));
    const img_to_download = document.createElement('img');
    img_to_download.src = 'data:image/svg+xml;base64,' + base64doc;
    img_to_download.onload = function() {
      canvas.setAttribute('width', w);
      canvas.setAttribute('height', h);
      const context = canvas.getContext('2d');
      //context.clearRect(0, 0, w, h);
      context.drawImage(img_to_download, 0, 0, w, h);
      const dataURL = canvas.toDataURL('image/png');
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), `${name}-qr.png`);
        e.preventDefault();
      } else {
        const a = document.createElement('a');
        const my_evt = new MouseEvent('click');
        a.download = `${name}-qr.png`;
        a.href = dataURL;
        a.dispatchEvent(my_evt);
      }
    };
  }

  return (
    <>
      <div className="my-qr-code">
        <div className="qr-inner">
          <Logo />
          {/* qr code */}
          <div className="qr-box">
            <QRCode id="qrCode" size={230} value={value} />
          </div>

          {/* details */}
          <div className="details">
            <p className="name">{name}</p>
            <p className="email c-text">{email}</p>
          </div>

          <p className="c-text" style={{ marginBottom: '30px' }}>
            Scan QR code for donation
          </p>

          {/* buttons */}
          <div className="buttons">
            <p
              className="btn btnPrimary"
              onClick={e => {
                downloadQrCode(e);
              }}
            >
              Download QR
            </p>
            <div className="divide">OR</div>
            <p
              className="btn btnSecondary"
              onClick={e => {
                e.preventDefault();
                setModalOpen(true);
              }}
            >
              Share
            </p>
          </div>
        </div>
      </div>
      <Modal
        className="modal-form share-modal share-qr"
        title="Share QR Code"
        onCancel={() => {
          setModalOpen(false);
        }}
        visible={modalOpen}
        centered
      >
        <ShareLinks />
      </Modal>
    </>
  );
};

export default QrDetails;
