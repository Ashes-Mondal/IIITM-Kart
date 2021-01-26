import React, { useContext, useState } from "react";
import { Item } from "../App";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SearchBox = () => {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const handleClose = () => {
    setState({ open: false, vertical: "top", horizontal: "center" });
  };
  const { vertical, horizontal, open } = state;
  const history = useHistory();
  const [Search, setSearch] = useState("");
  const { setItemList } = useContext(Item);
  //handleSearchSubmit
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    history.push("/");
    //requesting server to fetch Search data
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Search: Search }),
    };
    const result = await (await fetch("/search", requestOptions)).json();
    if (result.response === false) {
      setState({ open: true, vertical: "top", horizontal: "center" });
    } else {
      setItemList(result.itemList);
    }
  };
  return (
    <div className="search-box">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={4000}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="error">
          Could not find anything!
        </Alert>
      </Snackbar>
      <form onSubmit={handleSearchSubmit} className="search-box-form ">
        <input
          className="form-control"
          type="search"
          placeholder="search product"
          value={Search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        {window.innerWidth <= 580 ? null : (
          <button
            type="submit"
            className="tc btn btn-warning btn-circle btn-lg ml-1"
          >
            <SearchIcon />
          </button>
        )}
      </form>
    </div>
  );
};
export default SearchBox;

/*********************************************OLD SEARCH BUTTON ***********************************************/
/*
/* <button className="searchButton">
        <div className="d-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
     </button> 
      */
