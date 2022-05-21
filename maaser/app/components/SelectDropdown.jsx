import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

const SelectDropdown = ({ title, getValue, options, className }) => {
  return (
    <div
      className={className ? `filter-dropdown ${className}` : 'filter-dropdown'}
    >
      {title}
      <Select
        defaultValue="All"
        dropdownStyle={{
          minWidth: '120px',
        }}
        onChange={value => {
          getValue(value);
        }}
      >
        {options.map((option, index) => {
          return (
            <Option value={option.value} key={index}>
              {option.img ? (
                <img
                  style={{ width: '18px', marginRight: '8px' }}
                  src={option.img}
                  alt={option.text}
                />
              ) : (
                ''
              )}
              {option.text}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default SelectDropdown;
