import React from "react";

const SearchBox = (props) => {
  return (
    <input
      className="form-control"
      type="search"
      placeholder="search product"
      onChange={props.searchChange}
    />
  );
};

export default SearchBox;
