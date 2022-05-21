import React from 'react';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';
import CalanderGrey from '../images/calander-grey.svg';

export const DateRange = ({ getDateValue }) => {
  function handleDateChange(value, dateString) {
    const start = new Date(dateString[0]).getTime();
    const end = new Date(dateString[1]).getTime();
    getDateValue(start, end);
  }
  return (
    <div className="date-range">
      <img src={CalanderGrey} alt="" />
      <Space direction="vertical" size={12}>
        <RangePicker onChange={handleDateChange} />
      </Space>
    </div>
  );
};

export default DateRange;
