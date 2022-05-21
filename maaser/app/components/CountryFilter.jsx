import React from 'react';
import { Select } from 'antd';
const { Option } = Select;
import { countryList } from '../data/country';

const CountryFilter = ({ title, getValue, className }) => {
  const options = countryList;
  return (
    <div
      className={className ? `filter-dropdown ${className}` : 'filter-dropdown'}
    >
      {title}
      <Select
        showSearch
        defaultValue="All"
        dropdownStyle={{
          minWidth: '150px',
        }}
        onChange={value => {
          getValue(value);
        }}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
      >
        <Option value="" key="0">
          All
        </Option>
        {options.map((option, index) => {
          return (
            <Option value={option.alpha3} key={index}>
              {option.name}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default CountryFilter;
