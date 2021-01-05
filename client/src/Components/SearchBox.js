import React, { useContext, useState } from "react";
import { Item } from "../App";

const SearchBox = () => {
  const [Search, setSearch] = useState("");
  const { setItemList } = useContext(Item);
  //handleSearchSubmit
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    //requesting server to fetch Search data
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Search: Search }),
    };
    const result = await (await fetch("/search", requestOptions)).json();
    if (result.response === false) {
      alert("Could not find the result!!");
    } else {
      setItemList({ type: "setItemList", payload: result.itemList });
    }
  };
  return (
    <form className="search-box-form" onSubmit={handleSearchSubmit}>
      <input
        className="form-control"
        type="search"
        placeholder="search product"
        value={Search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button className="btn  btn-dark">Search</button>
    </form>
  );
};

export default SearchBox;
