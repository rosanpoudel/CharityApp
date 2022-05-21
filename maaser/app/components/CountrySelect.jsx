import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
const { Option } = Select;
import { DisableAutoComplete } from '../utils/helpers/searchSelect';
import { countryList } from '../data/country';

const CountrySelect = ({ getCountryCode, countryError, value }) => {
  const [autocomplete, setAutocomplete] = useState(false);

  function handleCountryChange(value) {
    const countryCode = countryList.filter((country, index) => {
      return country.name === value;
    });
    getCountryCode(countryCode[0].alpha3);
  }

  function showValue() {
    const countryName = countryList.filter(country => country.alpha3 === value);
    return countryName[0] && countryName[0].name;
  }

  return (
    <div className="form-row form-select">
      <label className="form-label" htmlFor="country">
        Country
      </label>
      <Select
        className="form-input select"
        name="country"
        id="country"
        onChange={handleCountryChange}
        value={showValue()}
        required="required"
        bordered={false}
        showSearch
        onFocus={() =>
          DisableAutoComplete(
            autocomplete,
            setAutocomplete,
            'ant-select-selection-search-input',
          )
        }
      >
        {countryList.map(country => {
          const { alpha3, file_url, name } = country;
          return (
            <Option
              value={name}
              key={name}
              style={{
                paddingTop: '10px',
                paddingBottom: '10px',
              }}
            >
              <img
                src={file_url}
                style={{
                  width: '24px',
                  height: '18px',
                  marginRight: '10px',
                  objectFit: 'contain',
                }}
              />
              <span style={{ fontSize: '16px' }}>{name}</span>
            </Option>
          );
        })}
      </Select>
      {countryError ? (
        <p className="error-msg">*please select a country</p>
      ) : (
        ''
      )}
    </div>
  );
};

export default CountrySelect;
