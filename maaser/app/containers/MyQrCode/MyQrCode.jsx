import React, { useState } from 'react';
import { Modal } from 'antd';

// qr details
import QrDetails from '../../components/QrDetails';

const MyQrCode = ({ profileData }) => {
  // datas
  const id = profileData.account ? profileData.account.accountid : '';
  const name = profileData.account ? profileData.account.fullname : '';
  const email = profileData.account ? profileData.account.email : '';

  return (
    <>
      <QrDetails value={id} name={name} email={email} />
    </>
  );
};

export default MyQrCode;
