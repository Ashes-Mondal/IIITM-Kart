import React, { useContext, useState } from "react";
import { Item } from "../App";
// import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import SearchBar from "material-ui-search-bar";

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
  const handleSearchSubmit = async () => {
    // e.preventDefault();
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
      <SearchBar
        type="text"
        placeholder="search product"
        onChange={(value) => {
          setSearch(value);
        }}
        onRequestSearch={() => handleSearchSubmit()}
        style={{
          width: "100%",
          alignSelf: "center",
          height: "2rem",
        }}
      />
    </div>
  );
};
export default SearchBox;
