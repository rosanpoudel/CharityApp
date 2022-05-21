import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import PdfIcon from '../images/pdf.svg';
import XlsIcon from '../images/xls.svg';

const ExportData = ({ pdfClick, excelClick }) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <p onClick={pdfClick}>
          <img style={{ marginRight: '10px' }} src={PdfIcon} alt="" />
          PDF
        </p>
      </Menu.Item>
      <Menu.Item key="1">
        <p onClick={excelClick}>
          <img style={{ marginRight: '10px' }} src={XlsIcon} alt="" />
          Excel
        </p>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="export-data">
      <Dropdown width overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          Export <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
};

export default ExportData;
