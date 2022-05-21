import React from 'react';
import SearchIcon from '../images/search-icon-grey.svg';

const FilterSearch = ({ getSearchValue }) => {
  return (
    <div className="filter-search">
      <span className="search-icon">
        <img src={SearchIcon} />
      </span>
      <input
        className="search-input"
        onChange={e => {
          getSearchValue(e.target.value);
        }}
        placeholder="Search"
        type="text"
      />
    </div>
  );
};

export default FilterSearch;
