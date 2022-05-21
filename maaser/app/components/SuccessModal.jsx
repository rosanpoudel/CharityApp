import React from 'react';
import { Modal } from 'antd';
import TickIcon from '../images/tick-icon.svg';
import history from '../utils/history';

const SuccessModal = ({
  successMsg,
  btnText,
  successStatus,
  setSuccessStatus,
  redirectLink,
}) => {
  return (
    <Modal
      className="modal-form success-modal"
      visible={successStatus ? true : false}
      centered
      onCancel={() => {
        setSuccessStatus(false);
      }}
    >
      {/* success message */}
      <div className="success-modal-content">
        <p className="c-text success-msg">{successMsg}</p>

        <img className="tick-icon" src={TickIcon} alt="tick icon" />
        <button
          className="btn btnPrimary"
          onClick={() => {
            setSuccessStatus(false);
            history.push(redirectLink);
          }}
        >
          {btnText}
        </button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
