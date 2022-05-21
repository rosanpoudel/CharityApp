import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const OutlinedSpinner = () => {
  const outlinedIcon = (
    <LoadingOutlined style={{ fontSize: 20, color: '#ffffff' }} spin />
  );
  return <Spin style={{ marginLeft: '10px' }} indicator={outlinedIcon} />;
};

export const DottedSpinner = () => {
  return <Spin />;
};
