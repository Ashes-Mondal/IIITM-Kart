import React, { useReducer, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CardList from "./Components/CardList";
import SearchBox from "./Components/SearchBox";
import "./App.css";

const reducer = (currState, action) => {
  switch (action.type) {
    case "fetchedItemJson":
      console.log("dispatch-ItemData", action.payload);
      return action.payload;
    default:
      return currState;
  }
};

const App = () => {
  const [itemList, dispatch] = useReducer(reducer, []);

  //side effect when page first time rendered
  useEffect(() => {
    const URL = "/fetchItems";

    const fetchJSON_fromServer = async () => {
      const itemList = await (await fetch(URL)).json();
      dispatch({ type: "fetchedItemJson", payload: itemList });
    };
    fetchJSON_fromServer();
  }, []);

  return (
    <>
      <div className="heading">
        <span className="text1">IIITM-Kart</span>
        <span className="text2">A Shopping site for IIITM students</span>
      </div>

      <div className="col container shadow p-3 mb-5 bg-white rounded">
        <SearchBox />
        <CardList itemList={itemList} />
      </div>
    </>
  );
};

export default App;
